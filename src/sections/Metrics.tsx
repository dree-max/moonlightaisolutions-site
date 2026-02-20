import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: 60,
    suffix: '%',
    label: 'Faster reporting',
    description: 'Automated pipelines that deliver dashboards by 9am.',
  },
  {
    value: 4.2,
    suffix: 'x',
    label: 'ROI in 90 days',
    description: 'Agent-assisted workflows that reduce rework and ramp time.',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Uptime',
    description: 'Self-healing integrations with monitoring and alerts.',
  },
];

const Metrics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(metrics.map(() => 0));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !label || !headline || !cards) return;

    const cardElements = cards.querySelectorAll('.metric-card');

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
            setCounters(metrics.map(() => 0));
          },
          onUpdate: (self) => {
            // Animate counters during entrance phase
            if (self.progress > 0.1 && self.progress < 0.4) {
              const progress = (self.progress - 0.1) / 0.3;
              setCounters(
                metrics.map((m) => Math.round(m.value * progress * 10) / 10)
              );
            }
          },
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        [label, headline],
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        cardElements,
        { y: '70vh', opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          ease: 'power2.out',
        },
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
        { y: '-35vh', opacity: 0, stagger: 0.04, ease: 'power2.in' },
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
            'radial-gradient(circle at 50% 50%, rgba(47,107,255,0.06), transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Label */}
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt text-center mb-4"
        >
          Impact
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary text-center mb-16"
        >
          Real results. Real systems.
        </h2>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card w-full max-w-sm lg:w-[28vw] lg:min-w-[280px] lg:max-w-[400px] h-auto lg:h-[38vh] min-h-[240px] glass-card rounded-[28px] p-8 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cobalt mb-2">
                {metric.value % 1 === 0
                  ? Math.round(counters[index])
                  : counters[index].toFixed(1)}
                <span className="text-3xl sm:text-4xl">{metric.suffix}</span>
              </div>
              <p className="text-text-primary font-medium mb-2">
                {metric.label}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed max-w-[240px]">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;