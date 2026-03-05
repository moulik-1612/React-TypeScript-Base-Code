import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/header.tsx"; // create own as per project.
import Footer from "../components/footer/footer.tsx"; // create own as per project.
import ScrollToTop from "../components/scrollToTop.tsx";
import { useEffect, useState } from "react";
import onScroll from "../components/scrollToTop";
// import ChatWidget from "../component/chat/chat";
// import NewsletterSubscription from "../pages/Subscription";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      onScroll(setIsScrolled);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  return (
    <>
      {/* Fixed Header */}
      <ScrollToTop />
      <Header />

      {/* Page Content Wrapper */}
      <main
        className={`${
          isScrolled && isHome ? "pt-[70px]" : isHome ? "" : "pt-[70px]"
        } min-h-screen bg-white`}
      >
        {/* Add enough padding so content starts *below header* and *above footer* */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
