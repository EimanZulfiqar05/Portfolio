import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/-eiman-zulfiqar-019b73233/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:iemanzulfiqar05@gmail.com', label: 'Email' },
    { icon: Phone, href: 'tel:+923105390537', label: 'Phone' },
  ];

  const footerLinks = [
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#process', label: 'Process' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background border-t border-foreground/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              className="font-heading text-2xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              BuildWithEman
            </motion.div>
            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
              Building high-converting Shopify stores and smart digital systems. Strategic software engineering for modern ecommerce.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="font-paragraph text-sm text-foreground/70 hover:text-electric-blue transition-colors cursor-pointer inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="font-paragraph text-sm text-foreground/70">Shopify Development</li>
              <li className="font-paragraph text-sm text-foreground/70">CRO Optimization</li>
              <li className="font-paragraph text-sm text-foreground/70">AI Automation</li>
              <li className="font-paragraph text-sm text-foreground/70">Custom Themes</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-foreground/5 hover:bg-electric-blue/10 border border-foreground/10 hover:border-electric-blue/30 flex items-center justify-center text-foreground/70 hover:text-electric-blue transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            <div className="space-y-2 mt-6">
              <p className="font-paragraph text-sm text-foreground/70">
                iemanzulfiqar05@gmail.com
              </p>
              <p className="font-paragraph text-sm text-foreground/70">
                +923105390537
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-foreground/10">
          <p className="font-paragraph text-sm text-foreground/50 text-center">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />
    </footer>
  );
}
