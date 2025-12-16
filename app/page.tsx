"use client"

import { ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-6 bg-white transform -skew-x-12"></div>
                <div className="w-3 h-6 bg-white transform -skew-x-12"></div>
              </div>
              <span className="text-xl font-semibold">morningside</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.67-5.829 6.67H2.423l7.723-8.835L1.482 2.25h6.679l4.632 6.142L15.69 2.25h.554zm-1.38 17.87h1.832L5.864 4.15H3.876z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Client Logos Section */}
        <div className="mb-20">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            <div className="text-lg font-semibold text-slate-300">RealEstateU</div>
            <div className="px-4 py-2 border border-slate-700 rounded font-semibold">MARS BOX</div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
              <span>Citation</span>
            </div>
            <div className="text-slate-300 font-semibold">CENT OPS</div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="font-bold text-lg">Λ</div>
              <span>ASMUSS</span>
            </div>
          </div>
        </div>

        {/* Hero Content Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-12 md:p-16 space-y-6">
            {/* Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2">It's time to move from</h1>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">AI curious to AI-native.</h2>
            </div>

            {/* Body Text */}
            <div className="space-y-4 text-slate-50/90 leading-relaxed">
              <p>
                At Morningside AI, we believe the conversation around artificial intelligence has been dominated by
                hype, fear, and empty promises. Too many businesses have been left with pretty slides and failed
                prototypes, but no real progress.
              </p>

              <p>
                The challenges ahead are real: slowing productivity, tighter competition, and rising expectations from
                customers and employees. The margin for inefficiency and lackluster performance is gone. Every company
                now faces a choice – speed up or fall behind.
              </p>

              <p>
                AI is the path forward. It provides the infrastructure for a new level of business performance. Used
                well, AI does not replace people. It fundamentally redefines how they create value. And it sharpens how
                organizations think, decide, and execute.
              </p>

              <p>That's where we come in.</p>

              <p>
                We're not the kind of consultancy that talks about what could happen someday. We build what actually
                works today. We design the automations, copilots, and systems that reshape how your teams operate, and
                we make sure the change lasts. Then, we help your people become fluent in the tools that will define
                their work for the next decade.
              </p>

              <p>We call this becoming AI-first. Not just aware of the technology, but built on top of it.</p>

              <p>
                That's why Morningside AI exists: to help forward-thinking businesses turn AI from an abstract idea into
                a real competitive advantage. We don't just implement AI. We build AI operating systems for the next
                decade of growth.
              </p>

              <p>
                The future has arrived. And it belongs to those who are willing to step off the sidelines and into the
                action.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
