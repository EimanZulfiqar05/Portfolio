import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(57, 255, 20, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 50%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 70%, rgba(57, 255, 20, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(57, 255, 20, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-paragraph text-sm text-primary font-bold uppercase tracking-wider">
                Let's Build Something Amazing
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
              Ready to Scale{' '}
              <span className="bg-gradient-to-r from-primary via-electric-blue to-soft-purple bg-clip-text text-transparent">
                Your Store?
              </span>
            </h2>

            <p className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              Let's discuss how strategic development and optimization can transform your ecommerce business. Available for select projects starting Q2 2026.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => window.location.href = 'mailto:hello@example.com'}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-bold px-10 py-7 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(57,255,20,0.5)] group relative overflow-hidden"
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    <Mail size={20} />
                    Start a Project
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    const element = document.querySelector('#projects');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="outline"
                  className="bg-transparent text-electric-blue border-2 border-electric-blue hover:bg-electric-blue/10 font-paragraph font-bold px-10 py-7 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                >
                  View Case Studies
                </Button>
              </motion.div>
            </div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-12 border-t border-foreground/10"
            >
              <p className="font-paragraph text-sm text-foreground/50 mb-4">
                Prefer to reach out directly?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-foreground/70">
                <a
                  href="mailto:hello@example.com"
                  className="font-paragraph text-base hover:text-electric-blue transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  hello@example.com
                </a>
                <span className="hidden sm:inline text-foreground/30">•</span>
                <span className="font-paragraph text-base">
                  Response within 24 hours
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
