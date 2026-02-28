import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const words = "10X Faster Development with Modern AI Strategies".split(' ');

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(138, 43, 226, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(138, 43, 226, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, rgba(138, 43, 226, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%), radial-gradient(circle at 50% 30%, rgba(0, 255, 255, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(138, 43, 226, 0.08) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-12 text-center"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-8"
        >
          <Sparkles size={16} className="text-electric-blue" />
          <span className="font-paragraph text-sm text-electric-blue font-medium">
            Available for Select Projects
          </span>
        </motion.div>

        {/* Animated Heading */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-3 md:mr-4"
              style={{
                background: index % 3 === 0 ? 'linear-gradient(135deg, #00FFFF 0%, #8A2BE2 100%)' : 'none',
                WebkitBackgroundClip: index % 3 === 0 ? 'text' : 'none',
                WebkitTextFillColor: index % 3 === 0 ? 'transparent' : 'inherit',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          While other developers take 10 days, I deliver in 3. Leveraging cutting-edge AI strategies and modern development practices to accelerate your project timeline without compromising quality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {
                const element = document.querySelector('#projects');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-bold px-8 py-6 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(57,255,20,0.4)] group"
            >
              View Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {
                const element = document.querySelector('#cta');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              className="bg-transparent text-electric-blue border-2 border-electric-blue hover:bg-electric-blue/10 font-paragraph font-bold px-8 py-6 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
            >
              Work With Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-electric-blue rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
