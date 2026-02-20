import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, PenTool, Rocket, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Compass,
    title: 'Discovery',
    description: 'Map workflows, tools, and decision points.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Build the agent logic and integration plan.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'Launch with monitoring and guardrails.',
  },
  {
    icon: TrendingUp,
    title: 'Optimize',
    description: 'Tune, document, and hand over.',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const line = lineRef.current;
    const cards = cardsRef.current;

    if (!section || !label || !headline || !line || !cards) return;

    const cardElements = cards.querySelectorAll('.process-card');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(label, { y: 0, opacity: 1 });
            gsap.set(headline, { y: 0, opacity: 1 });
            gsap.set(line, { scaleY: 1 });
            gsap.set(cardElements, { x: 0, opacity: 1 });
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

      // Timeline line draw
      scrollTl.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, ease: 'power2.out' },
        0
      );

      // Cards from sides with stagger
      cardElements.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        scrollTl.fromTo(
          card,
          { x: isLeft ? '-50vw' : '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power3.out' },
          index * 0.04
        );
      });

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
        { y: '-18vh', opacity: 0, stagger: 0.03, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        line,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'top', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="process"
      ref={sectionRef}
      className="section-pinned flex flex-col items-center justify-center bg-navy-900"
    >
      {/* Background beam */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[20vh] w-px h-[60vh] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(47,107,255,0.2) 20%, rgba(47,107,255,0.2) 80%, transparent)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Label */}
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt text-center mb-4"
        >
          Process
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary text-center mb-16"
        >
          From first call to live system.
        </h2>

        {/* Timeline */}
        <div ref={cardsRef} className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-white/10"
            style={{ transformOrigin: 'top' }}
          />

          {/* Steps */}
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`process-card relative flex items-center gap-6 lg:gap-12 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-cobalt -translate-x-1/2 z-10" />

                  {/* Card */}
                  <div
                    className={`ml-12 lg:ml-0 lg:w-[45%] ${
                      isLeft ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-6 flex items-start gap-4 transition-transform hover:scale-[1.01]">
                      <div className="w-10 h-10 rounded-lg bg-cobalt/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-cobalt" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {step.title}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;