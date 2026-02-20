import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        form,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="section-flowing bg-navy-900 py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column - Info */}
            <div ref={leftRef} className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-4">
                Contact
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-6">
                Tell us what you're building.
              </h2>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                We'll reply with a plan, a timeline, and honest next steps.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cobalt/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cobalt" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Email</p>
                    <a
                      href="mailto:info@moonlightaisolutions.com"
                      className="text-text-primary hover:text-cobalt transition-colors"
                    >
                      info@moonlightaisolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cobalt/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cobalt" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Location</p>
                    <p className="text-text-primary">
                      Remote-first, worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div ref={formRef}>
              <div className="glass-card rounded-[28px] p-8">
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-text-primary mb-4">
                    Get in touch
                  </h3>
                  <p className="text-text-secondary mb-8">
                    Fill out our form and we'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank')}
                    className="bg-cobalt hover:bg-cobalt-dark text-white px-8 py-5 rounded-full text-base font-medium transition-all hover:-translate-y-0.5"
                  >
                    Contact us
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/5">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-white rounded px-2 py-1 border border-gray-200 shadow-lg">
                <img
                  src="/images/logo.png"
                  alt="Moonlight.AI Solutions"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-text-secondary/60 text-sm">
              © {new Date().getFullYear()} Moonlight AI Solutions. All rights
              reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-text-secondary/60 hover:text-text-secondary text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-text-secondary/60 hover:text-text-secondary text-sm transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
