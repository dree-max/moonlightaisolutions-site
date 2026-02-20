import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Zap, MessageSquare, Bot, Globe, Check, ExternalLink, Copy, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'channel' | 'success';
  content: string;
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { type: 'system', content: '▲ OpenClaw Gateway v1.0.0 initializing...', delay: 0 },
  { type: 'system', content: '◉ Connected to Claude (Opus 4.6)', delay: 400 },
  { type: 'system', content: '◉ Connected to OpenAI (GPT-4o)', delay: 700 },
  { type: 'system', content: '◉ Loaded 12 skills from ClawHub', delay: 1000 },
  { type: 'system', content: '◉ Gateway listening on port 18789', delay: 1300 },
  { type: 'channel', content: '💬 Slack: "Hey, can you summarize today\'s sales report?"', delay: 1800 },
  { type: 'input', content: '> openclaw agent --message "Summarize today\'s sales report" --thinking high', delay: 2500 },
  { type: 'output', content: '📊 Analyzing sales data from CRM...', delay: 3200 },
  { type: 'output', content: '💰 Total Revenue: $47,832 (+12% vs yesterday)', delay: 3800 },
  { type: 'output', content: '👥 New Leads: 23 | Conversions: 8', delay: 4200 },
  { type: 'output', content: '🏆 Top Product: AI Analytics Suite - 15 units', delay: 4600 },
  { type: 'success', content: '✓ Summary sent to Slack', delay: 5000 },
  { type: 'channel', content: '📱 WhatsApp: "Remind me about the 3pm meeting"', delay: 5500 },
  { type: 'input', content: '> openclaw reminder --time "3pm" --message "Team standup"', delay: 6000 },
  { type: 'success', content: '✓ Reminder set for 2:55 PM', delay: 6500 },
  { type: 'channel', content: '🔔 Calendar: Meeting in 5 minutes', delay: 7000 },
  { type: 'system', content: '🤖 AI suggesting: "Join video call with prepared notes"', delay: 7500 },
];

const features = [
  {
    icon: MessageSquare,
    title: 'Omnichannel',
    description: 'WhatsApp, Telegram, Slack, Discord, Teams, Signal & more — unified inbox',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Autonomous agents that research, draft, and act on your behalf',
  },
  {
    icon: Globe,
    title: 'Local-First',
    description: 'Your data stays on your device. Full control, total privacy',
  },
];

const OpenClawLanding = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Terminal animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentIndex < terminalSequence.length) {
        setLines(prev => [...prev, terminalSequence[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset after completion
        setTimeout(() => {
          setLines([]);
          setCurrentIndex(0);
        }, 3000);
      }
    }, terminalSequence[currentIndex]?.delay ? Math.min(terminalSequence[currentIndex].delay - (terminalSequence[currentIndex - 1]?.delay || 0), 800) : 400);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const terminal = terminalRef.current;
    const features = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !terminal || !features || !cta) return;

    const featureCards = features.querySelectorAll('.feature-card');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set([header, terminal, features, cta], { y: 0, opacity: 1 });
          },
        },
      });

      // HEADER (0-15%)
      scrollTl.fromTo(
        header,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // TERMINAL (10-60%)
      scrollTl.fromTo(
        terminal,
        { y: '30vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.1
      );

      // FEATURES (50-85%)
      scrollTl.fromTo(
        featureCards,
        { y: '40vh', opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, ease: 'power2.out' },
        0.5
      );

      // CTA (80-100%)
      scrollTl.fromTo(
        cta,
        { y: '25vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return 'text-green-400';
      case 'output': return 'text-blue-300';
      case 'system': return 'text-yellow-400';
      case 'channel': return 'text-purple-300';
      case 'success': return 'text-green-400';
      default: return 'text-text-primary';
    }
  };

  const resetTerminal = () => {
    setLines([]);
    setCurrentIndex(0);
  };

  return (
    <div
      ref={sectionRef}
      className="section-pinned flex flex-col items-center justify-center bg-navy-900 py-12"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(47,107,255,0.15) 0%, transparent 60%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.08) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 w-full px-4 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cobalt/20 to-purple-500/20 border border-cobalt/30 mb-6">
            <Terminal className="w-4 h-4 text-cobalt" />
            <span className="text-cobalt text-sm font-medium">Powered by OpenClaw</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-text-primary mb-4">
            Your AI Assistant, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-purple-400">Your Rules</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            OpenClaw runs locally on your machine. Connect it to your channels,
            and watch it handle your work — while you focus on what matters.
          </p>
        </div>

        {/* Interactive Terminal */}
        <div ref={terminalRef} className="mb-8">
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-navy-800/80 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-text-secondary font-mono">openclaw@localhost</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetTerminal}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  title="Reset"
                >
                  <Play className="w-3.5 h-3.5 text-text-secondary" />
                </button>
                <span className="text-xs text-text-secondary/50 font-mono">Live Demo</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="h-[280px] lg:h-[320px] overflow-y-auto p-4 bg-navy-950/90 font-mono text-sm">
              {/* Initial welcome message */}
              {lines.length === 0 && (
                <div className="text-text-secondary/60">
                  <p>╔══════════════════════════════════════════════════════════════╗</p>
                  <p>║           OpenClaw Interactive Demo                         ║</p>
                  <p>║   Watch as OpenClaw handles messages & tasks              ║</p>
                  <p>╚══════════════════════════════════════════════════════════════╝</p>
                  <p className="mt-2 text-cobalt/80">Press play to start →</p>
                </div>
              )}

              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`${getLineColor(line.type)} mb-1 leading-relaxed`}
                  style={{ animation: 'fadeIn 0.3s ease-out' }}
                >
                  {line.type === 'input' && <span className="text-green-500">$ </span>}
                  {line.content}
                </div>
              ))}

              {/* Cursor */}
              {isPlaying && (
                <div className="flex items-center gap-1 mt-2">
                  <span className="w-2 h-4 bg-cobalt animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Terminal status */}
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Gateway Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cobalt" />
              <span>Claude Connected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>4 Channels</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card glass-card rounded-xl p-5 hover:border-cobalt/30 transition-all hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cobalt/20 to-purple-500/20 flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-cobalt" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="glass-card rounded-2xl p-6 max-w-2xl mx-auto border border-cobalt/20">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Need help setting up OpenClaw?
            </h3>
            <p className="text-text-secondary mb-5 text-sm">
              MoonlightAI Solutions handles installation, configuration, and custom integrations.
              Get OpenClaw running in your environment — hassle-free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank')}
                className="bg-cobalt hover:bg-cobalt-dark text-white px-6 py-5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 hover:scale-[1.02] group w-full sm:w-auto"
              >
                Get installation help
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/openclaw/openclaw', '_blank')}
                className="border-white/20 text-text-primary hover:bg-white/10 px-6 py-5 rounded-full text-sm font-medium w-full sm:w-auto"
              >
                View on GitHub
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenClawLanding;
