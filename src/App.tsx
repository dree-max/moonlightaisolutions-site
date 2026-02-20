import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import OpenClawLanding from './sections/OpenClawLanding';
import WhatWeDo from './sections/WhatWeDo';
import CaseStudy from './sections/CaseStudy';
import Metrics from './sections/Metrics';
import Services from './sections/Services';
import Process from './sections/Process';
import TechStack from './sections/TechStack';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) 
                ? r.center 
                : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out",
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-navy-900">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections with z-index stacking */}
      <main className="relative">
        <section className="relative z-10">
          <Hero />
        </section>
        <section className="relative z-15">
          <OpenClawLanding />
        </section>
        <section className="relative z-20">
          <WhatWeDo />
        </section>
        <section className="relative z-30">
          <CaseStudy />
        </section>
        <section className="relative z-40">
          <Metrics />
        </section>
        <section className="relative z-50">
          <Services />
        </section>
        <section className="relative z-[60]">
          <Process />
        </section>
        <section className="relative z-[70]">
          <TechStack />
        </section>
        <section className="relative z-[80]">
          <Testimonials />
        </section>
        <section className="relative z-[85]">
          <Blog />
        </section>
        <section className="relative z-[90]">
          <Pricing />
        </section>
        <section className="relative z-[100]">
          <FAQ />
        </section>
        <section className="relative z-[110]">
          <FinalCTA />
        </section>
        <section className="relative z-[120]">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;