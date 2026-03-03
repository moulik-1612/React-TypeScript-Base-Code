import { QueryClient } from "@tanstack/react-query";
import {} from "../types";
import { createCrudApi } from "./crudFactory";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

//! define endpoints of the api here
export const api = {
  blogs: createCrudApi<Blog, number>("blog", { //! create type or interface here
    getAllEndpoint: "/blogs",
    postEndpoint: "/admin/blogs",
    patchEndpoint: "/admin/blogs",
    deleteEndpoint: "/admin/blogs",
  }),
};
