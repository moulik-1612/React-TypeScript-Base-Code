import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./store";
import { queryClient } from "./lib/api";
// import Layout from "./components/Layout/Layout"; //! create layout component by ourself because its different for different project.
const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Routes>
        //! creates all the route here
        <Route
          path="/"
          element={
            <>
              <h1>Hello world</h1>
            </>
          }
        />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
