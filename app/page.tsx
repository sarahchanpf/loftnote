import { CTA } from "./components/CTA";
import { EventTypes } from "./components/EventTypes";
import { FeaturedMusicians } from "./components/FeaturedMusicians";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Testimonials } from "./components/Testimonials";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EventTypes />
        <FeaturedMusicians />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
