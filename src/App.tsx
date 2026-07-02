import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Aurora from "./components/Aurora";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import Thanks from "./pages/Thanks";
import NotFound from "./pages/NotFound";

/** Scrolls to the hash target after route changes, or to the top otherwise. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists after a page switch.
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="grain">
      <ScrollManager />
      <Aurora />
      <ScrollProgress />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
