// hooks/useCrud.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// lib/queryKeys.ts
export const qk = {
  base: (entity: string) => ["crud", entity] as const,
  list: (entity: string, params?: unknown) =>
    ["crud", entity, "list", params ?? {}] as const,
  detail: (entity: string, id: number | string) =>
    ["crud", entity, "detail", id] as const,
};

type Id = number | string;

export interface CrudApi<T, I extends number | string = number | string> {
  getAll: () => Promise<T[]>;
  getOne?: (id: I) => Promise<T>;
  create: (data: any) => Promise<T>;
  update: (id: I, data: any) => Promise<T>;
  remove: (id: I) => Promise<void>;
}

export function useCrud<
  T extends { id: I },
  I extends number | string = number
>(entity: string, api: CrudApi<T, I>, listParams?: unknown) {
  const qc = useQueryClient();
  const listKey = qk.list(entity, listParams);

  const list = useQuery({
    queryKey: listKey,
    queryFn: api.getAll,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes - prevents garbage collection
    refetchOnMount: true, // Refetch when component mounts if stale
    refetchOnWindowFocus: false,
  });

  //   const create = useMutation({
  //     mutationFn: (data: any) => api.create(data),
  //     onMutate: async (input: any) => {
  //       await qc.cancelQueries({ queryKey: listKey });
  //       const prev = qc.getQueryData<T[]>(listKey);
  //       if (prev) {
  //         const optimistic = typeof input === 'object' && !(input instanceof FormData) ? { ...input } : ({} as T);
  //         qc.setQueryData<T[]>(listKey, [...prev, optimistic as T]);
  //       }
  //       return { prev };
  //     },
  //     onError: (_err, _input, ctx) => {
  //       if (ctx?.prev) qc.setQueryData<T[]>(listKey, ctx.prev);
  //     },
  //     onSuccess: (created) => {
  //       qc.setQueryData<T[]>(listKey, (curr) => (curr ? curr.map((c) => (c.id === (created as any).id ? created : c)).concat(curr.find((c) => c.id === (created as any).id) ? [] : [created]) : [created]));
  //     },
  //     onSettled: () => {
  //       qc.invalidateQueries({ queryKey: listKey });
  //     },
  //   });

  const create = useMutation({
    mutationFn: (data: any) => api.create(data),
    onMutate: async (input: any) => {
      await qc.cancelQueries({ queryKey: listKey });
      const prev = qc.getQueryData<T[]>(listKey);

      // 🚨 Only optimistic update if it's NOT FormData
      if (prev && !(input instanceof FormData)) {
        const optimistic = { ...(input as any) } as T;
        qc.setQueryData<T[]>(listKey, [...prev, optimistic]);
      }

      return { prev };
    },
    onError: (_err, _input, ctx) => {
      if (ctx?.prev) qc.setQueryData<T[]>(listKey, ctx.prev);
    },
    onSuccess: (created) => {
      qc.setQueryData<T[]>(listKey, (curr) =>
        curr
          ? curr
              .map((c) => (c.id === created.id ? created : c))
              .concat(curr.find((c) => c.id === created.id) ? [] : [created])
          : [created]
      );
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: listKey, refetchType: "active" });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: I; data: any }) => api.update(id, data),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: listKey });
      const prev = qc.getQueryData<T[]>(listKey);
      if (prev && !(data instanceof FormData)) {
        qc.setQueryData<T[]>(
          listKey,
          prev.map((it) => (it.id === id ? { ...it, ...(data as any) } : it))
        );
      }
      return { prev };
    },
    onError: (_err, _input, ctx) => {
      if (ctx?.prev) qc.setQueryData<T[]>(listKey, ctx.prev);
    },
    onSuccess: (updated) => {
      qc.setQueryData<T[]>(listKey, (curr) =>
        curr
          ? curr.map((it) => (it.id === updated.id ? updated : it))
          : [updated]
      );
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: listKey, refetchType: "active" });
    },
  });

  const remove = useMutation({
    mutationFn: (id: I) => api.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: listKey });
      const prev = qc.getQueryData<T[]>(listKey);
      if (prev) {
        qc.setQueryData<T[]>(
          listKey,
          prev.filter((it) => it.id !== id)
        );
      }
      return { prev };
    },
    onError: (_err, _input, ctx) => {
      if (ctx?.prev) qc.setQueryData<T[]>(listKey, ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: listKey, refetchType: "active" });
    },
  });

  return { list, create, update, remove };
}
