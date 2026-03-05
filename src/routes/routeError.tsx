//! Route error component of HOR modify it for different project

import { Link, useRouteError } from "react-router-dom";

export default function RouteError() {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#800000]/10">
          <span className="text-3xl text-[#800000] font-bold">!</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-[#800000] mb-2">
          Something went wrong
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {error?.statusText ||
            error?.message ||
            "An unexpected error occurred. Please try again later."}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="
              inline-flex items-center justify-center
              px-6 py-2.5
              rounded-md
              bg-[#800000]
              text-white text-sm font-medium
              transition
              hover:bg-[#660000]
              focus:outline-none focus:ring-2 focus:ring-[#800000]/40
            "
          >
            Go to Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="
              inline-flex items-center justify-center
              px-6 py-2.5
              rounded-md
              border border-[#800000]
              text-[#800000] text-sm font-medium
              transition
              hover:bg-[#800000]/5
              focus:outline-none focus:ring-2 focus:ring-[#800000]/40
            "
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
