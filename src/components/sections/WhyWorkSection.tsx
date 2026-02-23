import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Zap, Brain, TrendingUp } from 'lucide-react';

export default function WhyWorkSection() {
  const reasons = [
    {
      icon: Brain,
      title: 'Systems, Not Pages',
      description: 'I build scalable architectures that grow with your business, not one-off solutions that break under pressure.',
    },
    {
      icon: Target,
      title: 'Conversion-First Thinking',
      description: 'Every line of code, every design decision is optimized for one thing: turning visitors into customers.',
    },
    {
      icon: Zap,
      title: 'Technical + Strategic',
      description: 'The rare combination of deep technical expertise and business strategy. I speak both languages fluently.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Real results from real projects. $2M+ in revenue generated, 5x average conversion lift, 98% client satisfaction.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block font-paragraph text-sm font-bold text-primary uppercase tracking-wider mb-4"
          >
            Why Choose Me
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Elite Execution,{' '}
            <span className="bg-gradient-to-r from-primary via-electric-blue to-soft-purple bg-clip-text text-transparent">
              Strategic Vision
            </span>
          </h2>
          <p className="font-paragraph text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Not just another developer. A strategic partner who understands both the technical complexity and business impact of every decision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} {...reason} index={index} />
          ))}
        </div>

        {/* Bold statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              I don't build websites.
              <br />
              <span className="bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">
                I build revenue engines.
              </span>
            </h3>
            
            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ReasonCardProps {
  icon: any;
  title: string;
  description: string;
  index: number;
}

function ReasonCard({ icon: Icon, title, description, index }: ReasonCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-foreground/5 to-foreground/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-foreground/10 hover:border-primary/30 transition-all duration-500"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-electric-blue/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />

      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300"
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        <Icon className="text-primary" size={32} />
      </motion.div>

      {/* Content */}
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
        {description}
      </p>

      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
