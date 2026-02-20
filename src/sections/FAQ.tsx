import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How long does a typical build take?',
    answer:
      'Most initial workflows go live in 2–3 weeks. Complex multi-agent systems typically take 4–6 weeks. We\'ll give you a clear timeline during discovery.',
  },
  {
    question: 'Do you work with our existing tools?',
    answer:
      'Yes. We integrate with 200+ tools including Salesforce, HubSpot, Slack, Notion, Airtable, and major cloud providers. If it has an API, we can connect it.',
  },
  {
    question: 'What does support look like?',
    answer:
      'All plans include monitoring and bug fixes. Growth and Scale plans include ongoing optimization, new feature development, and dedicated support channels.',
  },
  {
    question: 'Is our data secure?',
    answer:
      'Absolutely. We use enterprise-grade encryption, follow SOC 2 principles, and can deploy on your infrastructure if needed. Your data never trains public models.',
  },
  {
    question: 'Can we start with one workflow?',
    answer:
      'Definitely. Many clients start with a single high-impact workflow, then expand once they see results. Our Starter plan is designed for this approach.',
  },
  {
    question: 'What if we need changes after launch?',
    answer:
      'We build with flexibility in mind. Most changes can be made within 24–48 hours. Scale plans include a dedicated engineer for rapid iterations.',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const accordion = accordionRef.current;

    if (!section || !accordion) return;

    const items = accordion.querySelectorAll('.faq-item');

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
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
      id="faq"
      ref={sectionRef}
      className="section-flowing bg-navy-900 py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt text-center mb-4">
          FAQ
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary text-center mb-16">
          Questions we hear often.
        </h2>

        {/* Accordion */}
        <div ref={accordionRef} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item glass-card rounded-2xl px-6 border-none"
              >
                <AccordionTrigger className="text-text-primary text-left hover:no-underline py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;