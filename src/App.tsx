import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { queryClient } from "./lib/api";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
// import Layout from "./components/Layout/Layout"; //! create layout component by ourself because its different for different project.

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
