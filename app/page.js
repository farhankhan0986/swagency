import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import WhyTrustUs from "@/components/WhyTrustUs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatWeBuild />
      <WhyTrustUs />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
