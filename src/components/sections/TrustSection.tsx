import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

function AnimatedStat({ end, label, suffix = '', prefix = '', delay = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="font-heading text-5xl md:text-6xl lg:text-7xl font-black mb-3">
        <span className="bg-gradient-to-r from-electric-blue via-soft-purple to-primary bg-clip-text text-transparent">
          {prefix}{count}{suffix}
        </span>
      </div>
      <p className="font-paragraph text-base md:text-lg text-foreground/60">{label}</p>
    </motion.div>
  );
}

export default function TrustSection() {
  const stats = [
    { end: 50, suffix: '+', label: 'Projects Delivered', delay: 0 },
    { end: 2, suffix: 'M+', label: 'Revenue Generated', prefix: '$', delay: 0.1 },
    { end: 98, suffix: '%', label: 'Client Satisfaction', delay: 0.2 },
    { end: 5, suffix: 'x', label: 'Avg. Conversion Lift', delay: 0.3 },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-electric-blue/5 to-background" />

      <div className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by High-Growth Brands
          </h2>
          <p className="font-paragraph text-lg text-foreground/60 max-w-2xl mx-auto">
            Delivering measurable results through strategic development and optimization
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
