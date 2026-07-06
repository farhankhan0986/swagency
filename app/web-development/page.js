import Navbar from "@/components/Navbar";
import WebDevelopment from "@/components/WebDevelopment";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Web Development — Korvane",
  description:
    "Custom websites and web apps built with Next.js and React — fast, responsive, SEO-ready, and built to scale. Landing pages, business sites, SaaS platforms, dashboards, and more.",
};

export default function WebDevelopmentPage() {
  return (
    <main>
      <Navbar />
      <WebDevelopment />
      <Contact />
      <Footer />
    </main>
  );
}
