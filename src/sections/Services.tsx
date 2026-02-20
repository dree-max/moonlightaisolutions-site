import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Code, Layers, Database, BarChart3, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Search,
    title: 'Process Audit',
    description:
      'We map your workflows, identify bottlenecks, and find the highest-ROI automation opportunities.',
    wide: true,
    image: '/images/service_audit_office.jpg',
  },
  {
    icon: Code,
    title: 'Agent Development',
    description: 'Custom AI agents that handle research, drafting, and follow-ups.',
    wide: false,
  },
  {
    icon: Layers,
    title: 'Integration Layer',
    description: 'Connect your tools with clean APIs and reliable webhooks.',
    wide: false,
  },
  {
    icon: Database,
    title: 'Data Cleanup',
    description: 'Transform messy data into structured, actionable information.',
    wide: false,
  },
  {
    icon: BarChart3,
    title: 'Dashboards',
    description: 'Real-time visualizations that surface what matters.',
    wide: false,
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Ongoing monitoring, tuning, and optimization.',
    wide: false,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      // Flowing section - reveal on scroll
      cardElements.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="services"
      ref={sectionRef}
      className="section-flowing bg-navy-800 py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-4">
          Services
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-16 max-w-xl">
          A system for every bottleneck.
        </h2>

        {/* Bento Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Wide card */}
          <div className="service-card md:col-span-2 lg:col-span-2 lg:row-span-1 glass-card rounded-[28px] overflow-hidden group transition-transform hover:scale-[1.01]">
            <div className="relative h-full min-h-[280px] lg:min-h-[320px]">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="w-10 h-10 rounded-lg bg-cobalt/20 flex items-center justify-center mb-4">
                  <Search className="w-5 h-5 text-cobalt" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {services[0].title}
                </h3>
                <p className="text-text-secondary max-w-md">
                  {services[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Stacked cards */}
          {services.slice(1, 3).map((service, index) => (
            <div
              key={index}
              className="service-card glass-card rounded-[28px] p-6 lg:p-8 flex flex-col transition-transform hover:scale-[1.01]"
            >
              <div className="w-10 h-10 rounded-lg bg-cobalt/10 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-cobalt" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}

          {/* Bottom row */}
          {services.slice(3).map((service, index) => (
            <div
              key={index}
              className="service-card glass-card rounded-[28px] p-6 lg:p-8 flex flex-col transition-transform hover:scale-[1.01]"
            >
              <div className="w-10 h-10 rounded-lg bg-cobalt/10 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-cobalt" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;