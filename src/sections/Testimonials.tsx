import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Moonlight turned a two-day reporting process into a 20-minute workflow.',
    author: 'Ops Lead',
    company: 'Logistics',
  },
  {
    quote:
      'The agent drafts responses that sound like us—then we edit and send.',
    author: 'Customer Success Manager',
    company: 'SaaS',
  },
  {
    quote: 'We finally stopped copying data between tools.',
    author: 'Engineering Lead',
    company: 'Fintech',
  },
];

const Testimonials = () => {
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

    const cardElements = cards.querySelectorAll('.testimonial-card');

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
      scrollTl.fromTo(
        [label, headline],
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        cardElements,
        { y: '70vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.08, ease: 'power2.out' },
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
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Label */}
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt text-center mb-4"
        >
          Testimonials
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary text-center mb-16"
        >
          Teams that ship faster.
        </h2>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card w-full max-w-sm lg:w-[28vw] lg:min-w-[300px] lg:max-w-[420px] h-auto lg:h-[45vh] min-h-[260px] glass-card rounded-[28px] p-8 flex flex-col transition-transform hover:scale-[1.01]"
            >
              <Quote className="w-8 h-8 text-cobalt/40 mb-4" />
              <p className="text-text-primary text-lg leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-text-primary font-medium text-sm">
                  {testimonial.author}
                </p>
                <p className="text-text-secondary text-sm">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;