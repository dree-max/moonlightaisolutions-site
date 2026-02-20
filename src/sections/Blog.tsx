import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock, User, X, BookOpen, FileText, Layers } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'OpenAI\'s o3 Model: What It Means for Enterprise Automation',
    excerpt: 'The latest reasoning model from OpenAI promises breakthrough capabilities in complex problem-solving. Here\'s how businesses can leverage it.',
    content: `OpenAI's o3 model represents a significant leap forward in AI reasoning capabilities. With its ability to handle complex multi-step problems, o3 is particularly well-suited for enterprise automation tasks that require deep analysis and decision-making.

Key capabilities include:
- Advanced code generation and debugging
- Complex data analysis and pattern recognition
- Multi-step reasoning for business processes
- Improved accuracy in specialized domains

For enterprises, this means:
1. More reliable automation of knowledge work
2. Reduced need for human oversight in complex workflows
3. Ability to tackle problems previously requiring expert consultants
4. Faster implementation of AI-driven solutions

The model's reasoning capabilities make it ideal for tasks like financial analysis, legal document review, and strategic planning assistance.`,
    author: 'Moonlight Team',
    date: 'Feb 5, 2026',
    readTime: '5 min read',
    category: 'AI News',
    image: '/images/blog_ai_trends.jpg',
  },
  {
    id: 2,
    title: 'The Rise of AI Agents: From Chatbots to Autonomous Workers',
    excerpt: 'AI agents are evolving from simple conversational tools to autonomous systems that can execute complex workflows. Here\'s what you need to know.',
    content: `AI agents have come a long way from simple rule-based chatbots. Today's AI agents can:

- Plan and execute multi-step tasks autonomously
- Integrate with multiple tools and systems
- Learn from feedback and improve over time
- Handle exceptions and edge cases intelligently

The shift from reactive chatbots to proactive agents is transforming how businesses operate. Instead of waiting for user input, modern AI agents can:

1. Monitor systems and alert stakeholders
2. Execute routine tasks on schedules
3. Escalate issues when human intervention is needed
4. Generate reports and insights automatically

This evolution represents a fundamental change in how we think about AI in the workplace—moving from tools that assist humans to systems that can operate independently.`,
    author: 'Sarah Chen',
    date: 'Jan 28, 2026',
    readTime: '7 min read',
    category: 'Trends',
    image: '/images/blog_agents.jpg',
  },
  {
    id: 3,
    title: 'Building Production-Ready AI: Lessons from 100+ Deployments',
    excerpt: 'After deploying AI systems for over 100 clients, we\'ve learned what separates successful implementations from failed experiments.',
    content: `Deploying AI in production is fundamentally different from building prototypes. Here are the key lessons we've learned:

1. Start with the problem, not the technology
The most successful projects begin with a clear business problem and evaluate whether AI is the right solution—not the other way around.

2. Data quality beats model sophistication
A simple model with clean, relevant data will outperform a state-of-the-art model with messy data every time.

3. Plan for failure
AI systems will make mistakes. Build monitoring, fallback mechanisms, and human-in-the-loop processes from day one.

4. Measure business impact, not model metrics
Accuracy and F1 scores don't pay the bills. Track time saved, revenue generated, and customer satisfaction.

5. Iterate rapidly
The first version won't be perfect. Build feedback loops and improve continuously based on real-world usage.

These principles have guided our most successful deployments and helped clients achieve measurable ROI from their AI investments.`,
    author: 'Alex Rivera',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    category: 'Best Practices',
    image: '/images/blog_production.jpg',
  },
  {
    id: 4,
    title: 'Claude 3.5 Sonnet: A Game-Changer for Document Processing',
    excerpt: 'Anthropic\'s latest model shows remarkable improvements in understanding and processing complex documents.',
    content: `Claude 3.5 Sonnet has emerged as a leading model for document processing tasks. Its strengths include:

- Exceptional accuracy in extracting structured data from unstructured documents
- Strong performance on legal, financial, and technical documents
- Ability to understand context and nuance in complex texts
- Reliable handling of long documents up to 200K tokens

For businesses dealing with high volumes of documents, this translates to:

1. Faster contract review and analysis
2. Automated invoice processing with higher accuracy
3. Improved compliance checking
4. Better customer service through quick document lookup

The model's reliability makes it suitable for production deployments where accuracy is critical.`,
    author: 'Moonlight Team',
    date: 'Jan 8, 2026',
    readTime: '6 min read',
    category: 'AI News',
    image: '/images/blog_claude.jpg',
  },
  {
    id: 5,
    title: 'The Future of Work: Humans and AI as Teammates',
    excerpt: 'The most successful organizations are finding ways to combine human creativity with AI efficiency. Here\'s how to make it work.',
    content: `The debate about AI replacing humans misses the point. The real opportunity is in human-AI collaboration.

Successful teams are designing workflows where:

- AI handles routine, repetitive tasks
- Humans focus on creative and strategic work
- AI provides data-driven insights for human decision-making
- Humans provide judgment and contextKey principles for effective that AI lacks

 collaboration:

1. Clear role definition
Know what each party does best and design workflows accordingly.

2. Seamless handoffs
Make it easy for humans to step in when AI reaches its limits.

3. Continuous learning
Use human feedback to improve AI performance over time.

4. Trust building
Start with low-stakes tasks and gradually increase AI responsibility as trust develops.

Organizations that master this collaboration will outperform those that see AI as merely a cost-cutting tool.`,
    author: 'Maria Kim',
    date: 'Dec 20, 2025',
    readTime: '9 min read',
    category: 'Trends',
    image: '/images/blog_future_work.jpg',
  },
  {
    id: 6,
    title: '5 Automation Patterns That Save 10+ Hours Per Week',
    excerpt: 'These proven automation patterns can be implemented quickly and deliver immediate time savings for your team.',
    content: `After analyzing hundreds of workflows, we've identified five automation patterns that consistently deliver significant time savings:

1. Email Triage and Response
Automatically categorize incoming emails, draft responses for common queries, and escalate urgent matters. Typical savings: 2-3 hours/week.

2. Meeting Summarization and Action Items
Transcribe meetings, generate summaries, and extract action items with assigned owners. Typical savings: 1-2 hours/week.

3. Data Entry and Validation
Extract data from documents, validate against existing records, and populate systems automatically. Typical savings: 3-4 hours/week.

4. Report Generation
Pull data from multiple sources, generate formatted reports, and distribute to stakeholders. Typical savings: 2-3 hours/week.

5. Customer Support Triage
Classify support tickets, suggest solutions from knowledge base, and route to appropriate teams. Typical savings: 2+ hours/week.

These patterns can be implemented independently or combined for even greater impact. The key is starting with the highest-volume, most repetitive tasks.`,
    author: 'David Park',
    date: 'Dec 12, 2025',
    readTime: '6 min read',
    category: 'How-To',
    image: '/images/blog_automation.jpg',
  },
];

type BlogViewMode = 'medium' | 'page' | 'accordion';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [viewMode, setViewMode] = useState<BlogViewMode>('medium');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [readProgress, setReadProgress] = useState(0);
  const [currentPagePost, setCurrentPagePost] = useState<BlogPost | null>(null);

  // Scroll progress for medium modal
  useEffect(() => {
    if (!selectedPost) return;
    const handleScroll = () => {
      const scrollEl = document.querySelector('[data-scroll-container]');
      if (scrollEl) {
        const progress = Math.min(100, Math.max(0, (scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight)) * 100));
        setReadProgress(progress);
      }
    };
    const modalContent = document.querySelector('[data-modal-content]');
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, [selectedPost]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.blog-card');

    const ctx = gsap.context(() => {
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const navigateToPage = (post: BlogPost) => {
    setCurrentPagePost(post);
  };

  const goBack = () => {
    setCurrentPagePost(null);
  };

  // Render Medium-style modal
  const renderMediumModal = () => (
    <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden bg-navy-800 border-white/10 text-text-primary p-0">
        {selectedPost && (
          <div className="flex flex-col h-full max-h-[90vh]" data-modal-content>
            {/* Progress bar */}
            <div className="h-1 bg-white/10">
              <div
                className="h-full bg-cobalt transition-all duration-150"
                style={{ width: `${readProgress}%` }}
              />
            </div>

            {/* Hero Image */}
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cobalt/30 to-navy-900 flex items-center justify-center">
                <div className="text-8xl opacity-40">
                  {selectedPost.category === 'AI News' && '🤖'}
                  {selectedPost.category === 'Trends' && '📈'}
                  {selectedPost.category === 'Best Practices' && '✨'}
                  {selectedPost.category === 'How-To' && '🛠️'}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 rounded-full bg-cobalt/20 text-cobalt text-sm font-medium">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              <DialogHeader className="text-left mb-6">
                <DialogTitle className="text-3xl font-semibold text-text-primary leading-tight pr-8">
                  {selectedPost.title}
                </DialogTitle>
              </DialogHeader>

              {/* Author */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-cobalt/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-cobalt" />
                </div>
                <div>
                  <p className="text-text-primary font-medium text-lg">
                    {selectedPost.author}
                  </p>
                  <div className="flex items-center gap-3 text-text-secondary/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-text-secondary leading-relaxed mb-6 text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-text-secondary mb-4 text-lg">
                  Want to implement AI automation in your business?
                </p>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-dark text-white font-medium transition-all hover:scale-105"
                >
                  Book a call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  // Render Page view
  const renderPageView = () => {
    if (currentPagePost) {
      return (
        <div className="min-h-screen bg-navy-900 pt-24 pb-16">
          <div className="w-full px-6 lg:px-[7vw] max-w-4xl mx-auto">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-text-secondary hover:text-cobalt mb-8 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to all articles
            </button>

            <span className="px-4 py-1.5 rounded-full bg-cobalt/20 text-cobalt text-sm font-medium">
              {currentPagePost.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-text-primary mt-4 mb-6 leading-tight">
              {currentPagePost.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-cobalt/20 flex items-center justify-center">
                <User className="w-6 h-6 text-cobalt" />
              </div>
              <div>
                <p className="text-text-primary font-medium text-lg">
                  {currentPagePost.author}
                </p>
                <div className="flex items-center gap-3 text-text-secondary/60">
                  <span>{currentPagePost.date}</span>
                  <span>•</span>
                  <span>{currentPagePost.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {currentPagePost.content.split('\n\n').map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-text-secondary leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="bg-navy-800 rounded-2xl p-8 border border-white/5">
                <p className="text-text-primary text-xl font-medium mb-4">
                  Ready to transform your business with AI?
                </p>
                <button
                  onClick={() => window.open('https://lxghugze.formester.com/f/g3mOdkVNS', '_blank')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-dark text-white font-medium transition-all hover:scale-105"
                >
                  Book a free consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Render Accordion cards
  const renderAccordionCards = () => (
    <div className="space-y-4">
      {blogPosts.map((post) => {
        const isExpanded = expandedCards.has(post.id);
        return (
          <article
            key={post.id}
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 ${
              isExpanded ? 'bg-navy-800/80' : ''
            }`}
          >
            <button
              onClick={() => toggleAccordion(post.id)}
              className="w-full p-6 flex items-start gap-4 text-left"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-cobalt/10 flex items-center justify-center text-2xl">
                {post.category === 'AI News' && '🤖'}
                {post.category === 'Trends' && '📈'}
                {post.category === 'Best Practices' && '✨'}
                {post.category === 'How-To' && '🛠️'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-cobalt/20 text-cobalt text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-cobalt transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-text-secondary/60 text-sm">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ArrowRight className="w-4 h-4 text-text-secondary" />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 pt-0">
                <div className="pl-20">
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="border-t border-white/10 pt-4 mt-4">
                    {post.content.split('\n\n').slice(0, 2).map((paragraph, idx) => (
                      <p key={idx} className="text-text-secondary/80 leading-relaxed mb-4 text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToPage(post);
                    }}
                    className="inline-flex items-center gap-2 text-cobalt hover:text-cobalt-light font-medium mt-4 transition-colors"
                  >
                    Read full article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

  // If showing page view
  if (viewMode === 'page' && currentPagePost) {
    return renderPageView();
  }

  return (
    <>
      <div
        id="blog"
        ref={sectionRef}
        className="section-flowing bg-navy-900 py-24 lg:py-32"
      >
        <div className="w-full px-6 lg:px-[7vw]">
          {/* Header with View Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-4">
                Blog
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary max-w-xl">
                Latest insights on AI and automation.
              </h2>
            </div>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              <p className="text-text-secondary max-w-md">
                Stay updated with the latest trends, news, and best practices.
              </p>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-navy-800 rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('medium')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'medium'
                      ? 'bg-cobalt text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Medium</span>
                </button>
                <button
                  onClick={() => setViewMode('page')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'page'
                      ? 'bg-cobalt text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Page</span>
                </button>
                <button
                  onClick={() => setViewMode('accordion')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'accordion'
                      ? 'bg-cobalt text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span className="hidden sm:inline">Expand</span>
                </button>
              </div>
            </div>
          </div>

          {/* Blog Grid or Accordion based on view mode */}
          {viewMode === 'accordion' ? (
            renderAccordionCards()
          ) : viewMode === 'page' ? (
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => navigateToPage(post)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateToPage(post);
                    }
                  }}
                  className="blog-card glass-card rounded-[28px] overflow-hidden cursor-pointer group transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cobalt/10"
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cobalt/20 to-navy-800 flex items-center justify-center">
                      <div className="text-6xl opacity-30">
                        {post.category === 'AI News' && '🤖'}
                        {post.category === 'Trends' && '📈'}
                        {post.category === 'Best Practices' && '✨'}
                        {post.category === 'How-To' && '🛠️'}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-cobalt/20 text-cobalt text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-cobalt transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-text-secondary/60 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-cobalt text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPost(post);
                    }
                  }}
                  className="blog-card glass-card rounded-[28px] overflow-hidden cursor-pointer group transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cobalt/10"
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cobalt/20 to-navy-800 flex items-center justify-center">
                      <div className="text-6xl opacity-30">
                        {post.category === 'AI News' && '🤖'}
                        {post.category === 'Trends' && '📈'}
                        {post.category === 'Best Practices' && '✨'}
                        {post.category === 'How-To' && '🛠️'}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-cobalt/20 text-cobalt text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-cobalt transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-text-secondary/60 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-cobalt text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View all button - hide for accordion and page mode */}
          {viewMode !== 'accordion' && viewMode !== 'page' && (
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 transition-all">
                View all articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Render Medium modal */}
        {renderMediumModal()}
      </div>

      {/* Render Page view overlay */}
      {viewMode === 'page' && currentPagePost && renderPageView()}
    </>
  );
};

export default Blog;
