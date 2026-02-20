import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Bot, Plug } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Zap,
    title: 'Automations',
    description: 'Workflows that connect your tools and eliminate busywork.',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Autonomous assistants that research, draft, and follow up.',
  },
  {
    icon: Plug,
    title: 'Integrations',
    description: 'Clean APIs and webhooks that keep data in sync.',
  },
];

const WhatWeDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !label || !headline || !cards) return;

    const cardElements = cards.querySelectorAll('.capability-card');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(label, { y: 0, opacity: 1 });
            gsap.set(headline, { y: 0, opacity: 1 });
            gsap.set(cardElements, { y: 0, opacity: 1, scale: 1 });
          },
        },
      });

      // ENTRANCE (0-30%)
      // Label + headline from top
      scrollTl.fromTo(
        label,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headline,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Cards from bottom with stagger
      scrollTl.fromTo(
        cardElements,
        { y: '60vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.06, ease: 'power2.out' },
        0
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        [label, headline],
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardElements,
        { y: 0, opacity: 1 },
        { y: '-40vh', opacity: 0, stagger: 0.04, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section-pinned flex flex-col items-center justify-center bg-navy-900"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(47,107,255,0.08), transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Label */}
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt text-center mb-4"
        >
          What We Do
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary text-center mb-16 max-w-2xl mx-auto"
        >
          We build AI systems that actually ship.
        </h2>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8"
        >
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="capability-card w-full max-w-sm lg:w-[28vw] lg:min-w-[300px] lg:max-w-[420px] h-auto lg:h-[52vh] min-h-[280px] glass-card rounded-[28px] p-8 flex flex-col items-start transition-transform hover:scale-[1.01]"
            >
              <div className="w-12 h-12 rounded-xl bg-cobalt/10 flex items-center justify-center mb-6">
                <cap.icon className="w-6 h-6 text-cobalt" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {cap.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;