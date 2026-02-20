import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const panel = panelRef.current;

    if (!section || !bg || !panel) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(bg, { scale: 1, x: 0, opacity: 1 });
            gsap.set(panel, { x: 0, opacity: 1, rotateY: 0 });
          },
        },
      });

      // ENTRANCE (0-30%)
      // Background parallax
      scrollTl.fromTo(
        bg,
        { scale: 1.1, x: '6vw', opacity: 0.7 },
        { scale: 1, x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Left panel slide in
      scrollTl.fromTo(
        panel,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out' },
        0
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        bg,
        { scale: 1, x: 0 },
        { scale: 1.06, x: '-4vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        panel,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section-pinned flex items-center justify-start"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/case_study_street.jpg"
          alt="Night street scene"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/40 to-transparent" />
      </div>

      {/* Content Panel */}
      <div
        ref={panelRef}
        className="relative z-10 ml-[7vw] w-[90vw] max-w-[560px] glass-card rounded-[28px] p-8 md:p-10"
      >
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-4">
          Case Study
        </p>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary mb-4 leading-tight">
          How a logistics team cut reporting time by 60%.
        </h2>

        {/* Body */}
        <p className="text-text-secondary leading-relaxed mb-8">
          We replaced manual data pulls with an agent-powered pipeline—clean
          dashboards, fewer errors, and decisions made before lunch.
        </p>

        {/* CTA */}
        <Button
          variant="outline"
          className="border-white/10 text-text-primary hover:bg-white/5 hover:border-white/20 px-6 py-5 rounded-full text-sm font-medium transition-all group"
        >
          Read the case study
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default CaseStudy;