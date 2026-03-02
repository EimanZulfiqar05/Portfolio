import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ClientTestimonials } from '@/entities';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<ClientTestimonials[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<ClientTestimonials>('clienttestimonials');
    setTestimonials(result.items);
    setIsLoading(false);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  if (isLoading || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
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
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block font-paragraph text-sm font-bold text-electric-blue uppercase tracking-wider mb-4"
          >
            Client Success
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            What Clients{' '}
            <span className="bg-gradient-to-r from-electric-blue to-soft-purple bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="font-paragraph text-lg text-foreground/60 max-w-3xl mx-auto">
            Real feedback from real clients who've experienced measurable growth
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Slider */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={goToPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-foreground/5 hover:bg-electric-blue/10 border border-foreground/10 hover:border-electric-blue/30 flex items-center justify-center text-foreground hover:text-electric-blue transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-electric-blue w-8'
                      : 'bg-foreground/20 hover:bg-foreground/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-foreground/5 hover:bg-electric-blue/10 border border-foreground/10 hover:border-electric-blue/30 flex items-center justify-center text-foreground hover:text-electric-blue transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: ClientTestimonials;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-foreground/5 to-foreground/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-foreground/10">
      {/* Quote icon */}
      <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center">
        <Quote className="text-electric-blue" size={28} />
      </div>

      <div className="pt-16">
        {/* Testimonial text */}
        <blockquote className="font-paragraph text-xl md:text-2xl text-foreground leading-relaxed mb-8">
          "{testimonial.testimonialText}"
        </blockquote>

        {/* Client name only */}
        <p className="font-heading text-lg font-bold text-foreground">
          {testimonial.clientName}
        </p>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />
    </div>
  );
}
