import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { WorkProcess } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ProcessSection() {
  const [steps, setSteps] = useState<WorkProcess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProcess();
  }, []);

  const loadProcess = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<WorkProcess>('workprocess');
    const sortedSteps = result.items.sort((a, b) => (a.stepOrder || 0) - (b.stepOrder || 0));
    setSteps(sortedSteps);
    setIsLoading(false);
  };

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
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
            className="inline-block font-paragraph text-sm font-bold text-primary uppercase tracking-wider mb-4"
          >
            How I Work
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            A Proven{' '}
            <span className="bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="font-paragraph text-lg text-foreground/60 max-w-3xl mx-auto">
            From strategy to scale, every project follows a systematic approach designed for maximum impact
          </p>
        </motion.div>

        <div className="min-h-[600px]">
          {isLoading ? null : (
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue/20 via-soft-purple/20 to-primary/20 transform -translate-x-1/2" />

              <div className="space-y-24">
                {steps.map((step, index) => (
                  <ProcessStep key={step._id} step={step} index={index} isEven={index % 2 === 0} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: WorkProcess;
  index: number;
  isEven: boolean;
}

function ProcessStep({ step, index, isEven }: ProcessStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className={`${isEven ? 'lg:text-right lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}>
        {/* Step number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-blue/20 to-soft-purple/20 border border-electric-blue/30 mb-6 ${
            isEven ? 'lg:ml-auto' : ''
          }`}
        >
          <span className="font-heading text-2xl font-black text-electric-blue">
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          {step.stepName}
        </h3>

        {step.shortSummary && (
          <p className="font-paragraph text-lg text-primary font-semibold mb-4">
            {step.shortSummary}
          </p>
        )}

        <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
          {step.stepDescription}
        </p>
      </div>

      {/* Visual */}
      <div className={`${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative group"
        >
          <div className="relative rounded-2xl overflow-hidden bg-foreground/5 border border-foreground/10 group-hover:border-electric-blue/30 transition-all duration-500">
            {step.visualRepresentation ? (
              <div className="aspect-[4/3] relative">
                <Image
                  src={step.visualRepresentation}
                  alt={step.stepName || 'Process step'}
                  width={600}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-soft-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ) : (
              <div className="aspect-[4/3] flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-electric-blue/20 to-soft-purple/20 border-4 border-electric-blue/30 flex items-center justify-center">
                  <span className="font-heading text-5xl font-black text-electric-blue">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-electric-blue/20 to-soft-purple/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
        </motion.div>
      </div>

      {/* Center dot for timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-electric-blue border-4 border-background shadow-[0_0_20px_rgba(0,255,255,0.5)]"
      />
    </motion.div>
  );
}
