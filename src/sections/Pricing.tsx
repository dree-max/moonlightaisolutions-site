import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '$3,500',
    period: '/mo',
    description: 'One workflow + one agent.',
    features: [
      'Single workflow automation',
      'One AI agent',
      'Basic integrations',
      'Email support',
      'Monthly reporting',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$7,500',
    period: '/mo',
    description: 'Multi-agent system + dashboards.',
    features: [
      'Up to 5 workflows',
      'Multiple AI agents',
      'Advanced integrations',
      'Real-time dashboards',
      'Priority support',
      'Weekly optimization',
    ],
    highlighted: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    description: 'Dedicated delivery + SLA.',
    features: [
      'Unlimited workflows',
      'Custom agent development',
      'Enterprise integrations',
      'Dedicated support',
      'SLA guarantee',
      'On-premise options',
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.pricing-card');

    const ctx = gsap.context(() => {
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
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
      id="pricing"
      ref={sectionRef}
      className="section-flowing bg-navy-800 py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt text-center mb-4">
          Pricing
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary text-center mb-4">
          Start small. Scale with confidence.
        </h2>

        <p className="text-text-secondary text-center mb-16 max-w-md mx-auto">
          Book a call to confirm fit and get a customized proposal.
        </p>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card flex-1 max-w-sm mx-auto lg:mx-0 rounded-[28px] p-8 flex flex-col transition-transform hover:scale-[1.01] ${
                plan.highlighted
                  ? 'bg-cobalt/10 border-2 border-cobalt/30'
                  : 'glass-card'
              }`}
            >
              {/* Plan name */}
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-4">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-text-primary">
                  {plan.price}
                </span>
                <span className="text-text-secondary ml-1">{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cobalt flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank')}
                className={`w-full py-5 rounded-full text-sm font-medium transition-all ${
                  plan.highlighted
                    ? 'bg-cobalt hover:bg-cobalt-dark text-white'
                    : 'bg-white/5 hover:bg-white/10 text-text-primary border border-white/10'
                }`}
              >
                Book a call
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;