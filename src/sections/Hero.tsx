import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const micro = microRef.current;

    if (!section || !bg || !headline || !sub || !cta || !micro) return;

    const ctx = gsap.context(() => {
      // Split headline into words
      const words = headline.querySelectorAll('.word');

      // LOAD ANIMATION (auto-play on mount)
      const loadTl = gsap.timeline();

      // Background fade in + scale
      loadTl.fromTo(
        bg,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      );

      // Headline words reveal
      loadTl.fromTo(
        words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, ease: 'power3.out' },
        0.2
      );

      // Subheadline
      loadTl.fromTo(
        sub,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.5
      );

      // CTA row
      loadTl.fromTo(
        cta,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.65
      );

      // Micro text
      loadTl.fromTo(
        micro,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.8
      );

      // SCROLL-DRIVEN EXIT ANIMATION
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headline, sub, cta, micro], { opacity: 1, y: 0 });
            gsap.set(bg, { scale: 1, y: 0 });
          },
        },
      });

      // Phase 1 (0-70%): Hold at settle state (no changes)
      // Phase 2 (70-100%): Exit

      // Headline block exit
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-28vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        sub,
        { y: 0, opacity: 1 },
        { y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        micro,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Background parallax on exit
      scrollTl.fromTo(
        bg,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineText = "AI that runs your operations while you sleep.";
  const words = headlineText.split(' ');

  return (
    <div
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero_city_skyline.jpg"
          alt="Night city skyline"
          className="w-full h-full object-cover"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-text-primary leading-tight mb-6"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          style={{ opacity: 0 }}
        >
          Automation, agents, and integrations—built for teams who want speed
          without the chaos.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <Button
            onClick={() => window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank')}
            className="bg-cobalt hover:bg-cobalt-dark text-white px-8 py-6 rounded-full text-base font-medium transition-all hover:-translate-y-0.5 hover:scale-[1.02] group"
          >
            Book a call
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <button
            onClick={scrollToServices}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium flex items-center gap-2"
          >
            See services
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Micro disclaimer */}
      <p
        ref={microRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary/60 text-xs font-mono uppercase tracking-wider"
        style={{ opacity: 0 }}
      >
        Free 20-minute alignment call. No pitch deck.
      </p>
    </div>
  );
};

export default Hero;