import { Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import RouteError from "../routes/routeError";
import Layout from "../layouts/layout";
// import NotFound from "../pages/notFound";

const withSuspense = (element: JSX.Element) => (
  <Suspense
    fallback={
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">
        Loading....
      </div>
    }
  >
    {element}
  </Suspense>
);

import { useNavigate } from "react-router-dom";

//! create this in the seprate file later
// eslint-disable-next-line react-refresh/only-export-components
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-gray-600 text-lg">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-black text-white rounded hover:opacity-80"
      >
        Go Back Home
      </button>
    </div>
  );
}

// ROUTER
export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      {
        path: "/",
        element: withSuspense(<NotFound />),
      },

      { path: "*", element: <NotFound /> },

      { path: "blog", element: withSuspense(<NotFound />) },

      { path: "blog/:id", element: withSuspense(<NotFound />) },

      { path: "faqs", element: withSuspense(<NotFound />) },

      { path: "our-story", element: withSuspense(<NotFound />) },

      {
        path: "privacy-policy",
        element: withSuspense(<NotFound />),
      },

      {
        path: "terms-conditions",
        element: withSuspense(<NotFound />),
      },

      {
        path: "return-policy",
        element: withSuspense(<NotFound />),
      },

      { path: "login", element: withSuspense(<NotFound />) },

      { path: "fashion/men", element: withSuspense(<NotFound />) },

      {
        path: "fashion/women",
        element: withSuspense(<NotFound />),
      },

      {
        path: "fashion/unisex",
        element: withSuspense(<NotFound />),
      },

      { path: "glowrituals", element: withSuspense(<NotFound />) },

      {
        element: withSuspense(<NotFound />),
        children: [
          {
            path: "/app",
            children: [
              {
                index: true,
                element: <NotFound />,
              },

              {
                path: "glowdetail/:id",
                element: withSuspense(<NotFound />),
              },

              {
                path: "detailpage/:id",
                element: withSuspense(<NotFound />),
              },

              {
                path: "cart",
                element: withSuspense(<NotFound />),
              },

              {
                path: "order",
                element: withSuspense(<NotFound />),
              },

              {
                path: "profile",
                element: withSuspense(<NotFound />),
              },
            ],
          },
        ],
      },
    ],
  },
]);
