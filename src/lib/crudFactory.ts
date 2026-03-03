import { apiRequest } from './http';

export interface CrudApiOptions {
  getAllEndpoint?: string;      // optional custom GET endpoint
  postEndpoint?: string;        // optional custom POST endpoint
  patchEndpoint?: string;       // optional custom PATCH endpoint
  deleteEndpoint?: string;      // optional custom DELETE endpoint
  getOne?: string;      // optional custom DELETE endpoint
}

export function createCrudApi<T,I extends number | string = number | string>(
  resource: string,
  options?: CrudApiOptions
) {
  return {
    getAll: async (): Promise<T[]> => {
      const endpoint = options?.getAllEndpoint ?? `/${resource}/`;
      return apiRequest<T[]>(endpoint);
    },

    getOne: async (id: I): Promise<T> => {
      // Use custom getOneEndpoint if provided, otherwise use getAllEndpoint as base
      if (options?.getOne) {
        return apiRequest<T>(`${options.getOne}/${id}`);
      }
      // Fallback to getAllEndpoint as base for getOne
      const baseEndpoint = options?.getAllEndpoint ?? `/${resource}`;
      const endpoint = `${baseEndpoint}/${id}/`;
      return apiRequest<T>(endpoint);
    },

    create: async (data: any): Promise<T> => {
      const endpoint = options?.postEndpoint ?? `/${resource}/`;
      const isFormData = data instanceof FormData;
      return apiRequest<T>(endpoint, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? data : JSON.stringify(data),
      });
    },

    update: async (id: I, data: any): Promise<T> => {
           const baseEndpoint = options?.patchEndpoint ?? `/${resource}`;
      const endpoint = `${baseEndpoint}/${id}`; 
      const isFormData = data instanceof FormData;
      return apiRequest<T>(endpoint, {
        method: 'PATCH',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? data : JSON.stringify(data),
      });
    },

    remove: async (id: I): Promise<void> => {
           const baseEndpoint = options?.deleteEndpoint ?? `/${resource}`;
      const endpoint = `${baseEndpoint}/${id}`;
      await apiRequest<void>(endpoint, { method: 'DELETE' });
    },
  };
}
