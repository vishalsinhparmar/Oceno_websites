import type { ComponentType } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import { mainNav } from "@/config/site";
import AboutPage from "@/pages/AboutPage";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";

/** Lightweight path routing until a router is introduced. */
const pages: Record<string, ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/products": ProductsPage,
};

function currentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function getActiveHref() {
  const path = currentPath();
  return mainNav.find((item) => item.href === path)?.href ?? "/";
}

export default function App() {
  const Page = pages[currentPath()] ?? HomePage;
  return (
    <div className="min-h-dvh bg-white">
      <Header activeHref={getActiveHref()} />
      <main id="main">
        <Page />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
