import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ShoppingCart, TrendingUp, Sparkles, Code, Layers, Zap } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const iconMap: Record<string, any> = {
  ShoppingCart,
  TrendingUp,
  Sparkles,
  Code,
  Layers,
  Zap,
};

export default function ServicesSection() {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Services>('services');
    const sortedServices = result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    setServices(sortedServices);
    setIsLoading(false);
  };

  const getIconForService = (index: number) => {
    const icons = [ShoppingCart, TrendingUp, Sparkles, Code, Layers, Zap];
    return icons[index % icons.length];
  };

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
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
            className="inline-block font-paragraph text-sm font-bold text-electric-blue uppercase tracking-wider mb-4"
          >
            What I Do
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Services That{' '}
            <span className="bg-gradient-to-r from-electric-blue to-soft-purple bg-clip-text text-transparent">
              Drive Growth
            </span>
          </h2>
          <p className="font-paragraph text-lg text-foreground/60 max-w-3xl mx-auto">
            Strategic development and optimization services designed to scale your ecommerce business
          </p>
        </motion.div>

        <div className="min-h-[600px]">
          {isLoading ? null : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => {
                const Icon = getIconForService(index);
                const features = service.features?.split('\n').filter(f => f.trim()) || [];

                return (
                  <ServiceCard
                    key={service._id}
                    icon={Icon}
                    title={service.serviceName || ''}
                    tagline={service.tagline || ''}
                    description={service.description || ''}
                    features={features}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  icon: any;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  index: number;
}

function ServiceCard({ icon: Icon, title, tagline, description, features, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-foreground/5 to-foreground/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-foreground/10 hover:border-electric-blue/30 transition-all duration-500 overflow-hidden"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-soft-purple/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
        initial={false}
      />

      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 group-hover:border-electric-blue/40 transition-all duration-300"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <Icon className="text-electric-blue" size={28} />
      </motion.div>

      {/* Content */}
      <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-electric-blue transition-colors duration-300">
        {title}
      </h3>
      
      {tagline && (
        <p className="font-paragraph text-sm text-soft-purple font-semibold mb-3">
          {tagline}
        </p>
      )}

      <p className="font-paragraph text-base text-foreground/70 mb-6 leading-relaxed">
        {description}
      </p>

      {features.length > 0 && (
        <ul className="space-y-2">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="font-paragraph text-sm text-foreground/60 flex items-start gap-2">
              <span className="text-electric-blue mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-electric-blue/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
