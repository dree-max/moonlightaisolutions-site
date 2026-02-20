import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Facebook, Twitter, Linkedin } from 'lucide-react';

// Placeholder social media URLs - replace with actual links
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/1878nSiLuD/?mibextid=wwXIfr',
  x: 'https://x.com/moonlightaisol',
  linkedin: 'https://www.linkedin.com/company/moonlight-aisolutions/',
};

// Formester contact form URL
const CONTACT_FORM_URL = 'https://lxghugze.formester.com/f/g3mOdkVNS';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Blog', id: 'blog' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - always visible with dark background */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center"
            >
              <div className="bg-white rounded-lg px-2 py-1 border border-gray-200 shadow-lg">
                <img
                  src="/images/logo.png"
                  alt="Moonlight.AI Solutions"
                  className="h-10 lg:h-12 w-auto object-contain"
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                onClick={() => window.open(CONTACT_FORM_URL, '_blank')}
                className="bg-cobalt hover:bg-cobalt-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                Book a call
              </Button>

              {/* Social Media Links */}
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                </a>
                <a
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-text-primary p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-navy-900 transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-text-primary text-2xl font-medium hover:text-cobalt transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => window.open(CONTACT_FORM_URL, '_blank')}
            className="bg-cobalt hover:bg-cobalt-dark text-white px-8 py-3 rounded-full text-lg font-medium mt-4"
          >
            Book a call
          </Button>

          {/* Social Media Links - Mobile */}
          <div className="flex items-center gap-4 mt-4">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-text-secondary" />
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-white/10 transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5 text-text-secondary" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-text-secondary" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;