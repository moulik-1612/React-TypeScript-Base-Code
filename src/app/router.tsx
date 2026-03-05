import { Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import RouteError from "../routes/routeError";

const withSuspense = (element: JSX.Element) => (
  <Suspense
    fallback={
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">
        {/* create your own custom loader for each application. */}
        {/* <Loader /> */} Loading....
      </div>
    }
  >
    {element}
  </Suspense>
);

// ROUTER
export const router = createBrowserRouter([
  {
    element: <Layout />, // create Different layout for the different projects
    errorElement: <RouteError />,
    children: [
      {
        path: "/",
        element: withSuspense(<HomePage />),
      },
      { path: "*", element: <NotFound /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "faqs", element: withSuspense(<FAQSection />) },
      { path: "our-story", element: withSuspense(<OurStory />) },
      {
        path: "privacy-policy",
        element: withSuspense(<PrivacyPolicySection />),
      },
      {
        path: "terms-conditions",
        element: withSuspense(<TermsConditionsSection />),
      },
      {
        path: "return-policy",
        element: withSuspense(<ReturnPolicySection />),
      },
      { path: "login", element: withSuspense(<LoginPage />) },
      { path: "fashion/men", element: withSuspense(<MensFashion />) },
      {
        path: "fashion/women",
        element: withSuspense(<WomensFashion />),
      },
      {
        path: "fashion/unisex",
        element: withSuspense(<UnisexFashion />),
      },
      { path: "glowrituals", element: withSuspense(<GlowRituals />) },
      // { path: "/analytics", element: withSuspense(<Analytics />) },
      {
        element: withSuspense(<ProtectedRoute />),
        children: [
          {
            path: "/app",
            // element: withSuspense(<Layout />),
            children: [
              {
                index: true,
                element: <NotFound />,
              },
              {
                path: "glowdetail/:id",
                element: withSuspense(<PerfumeDetailPage />),
              },
              {
                path: "detailpage/:id",
                element: withSuspense(<ProductDetailPage />),
              },
              { path: "cart", element: withSuspense(<CartPage />) },
              { path: "order", element: withSuspense(<Payment />) },
              { path: "profile", element: withSuspense(<UserProfile />) },
              // Add more lazy pages here
            ],
          },
        ],
      },
    ],
  },
]);
