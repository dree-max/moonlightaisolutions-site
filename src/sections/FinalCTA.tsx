import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    if (!section || !bg || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(bg, { scale: 1, opacity: 1 });
            gsap.set(content, { y: 0, opacity: 1 });
          },
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        bg,
        { scale: 1.12, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        content,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        bg,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        content,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/final_cta_street.jpg"
          alt="Night urban street"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-900/60" />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-tight mb-8">
          Let's build the system your team actually uses.
        </h2>

        <Button
          onClick={() => window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank')}
          className="bg-cobalt hover:bg-cobalt-dark text-white px-8 py-6 rounded-full text-base font-medium transition-all hover:-translate-y-0.5 hover:scale-[1.02] group mb-6"
        >
          Book a call
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-text-secondary/80 text-sm">
          Or email{' '}
          <a
            href="mailto:info@moonlightaisolutions.com"
            className="text-cobalt hover:underline"
          >
            info@moonlightaisolutions.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default FinalCTA;