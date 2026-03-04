// HPI 1.7-G
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProcessSection from '@/components/sections/ProcessSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart,
  CheckCircle2,
  Code,
  Cpu,
  Globe,
  Layers,
  Palette,
  Shield,
  TrendingUp,
  Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// --- CANONICAL DATA SOURCES ---
// Sourced from User Request & Entities Definitions

const HERO_DATA = {
  headline: "Building High-Converting Shopify Stores & Smart Digital Systems",
  subtext: "I engineer scalable e-commerce solutions and AI-driven automations that transform businesses. Strategic. Powerful. Elite.",
  ctaPrimary: "View Work",
  ctaSecondary: "Work With Me"
};

const TRUST_STATS = [
  { label: "Shopify Stores", value: "50+", prefix: "" },
  { label: "Conversion Uplift", value: "45%", prefix: "Avg " },
  { label: "Client Retention", value: "98%", prefix: "" },
];

const SERVICES_DATA = [
  {
    id: "shopify",
    title: "Shopify Development",
    description: "Custom themes and headless architectures built for speed and conversion.",
    icon: <Globe className="w-8 h-8" />,
    features: ["Headless Commerce", "Custom Liquid", "App Integration"]
  },
  {
    id: "cro",
    title: "CRO Optimization",
    description: "Data-driven strategies to turn more visitors into loyal customers.",
    icon: <TrendingUp className="w-8 h-8" />,
    features: ["A/B Testing", "User Funnels", "Heatmap Analysis"]
  },
  {
    id: "ai",
    title: "AI Automation",
    description: "Streamlining operations with intelligent agents and automated workflows.",
    icon: <Cpu className="w-8 h-8" />,
    features: ["Chatbots", "Inventory Sync", "Predictive Analytics"]
  },
  {
    id: "theme",
    title: "Custom Theme Dev",
    description: "Bespoke design implementation that perfectly matches your brand identity.",
    icon: <Palette className="w-8 h-8" />,
    features: ["Pixel Perfect", "Mobile First", "Performance Focused"]
  },
  {
    id: "systems",
    title: "Full-Stack Systems",
    description: "End-to-end technical ecosystems connecting your store to the world.",
    icon: <Layers className="w-8 h-8" />,
    features: ["API Development", "Database Design", "Cloud Infrastructure"]
  }
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Velvet & Vine",
    category: "E-Commerce / Shopify",
    metric: "+240% Sales",
    image: "https://static.wixstatic.com/media/11d65c_db9182f7232949399993f683a30837ed~mv2.png?originWidth=1152&originHeight=768",
    description: "A complete brand overhaul and headless Shopify build for a luxury fashion retailer."
  },
  {
    id: 2,
    title: "TechFlow Systems",
    category: "SaaS / Dashboard",
    metric: "3x Efficiency",
    image: "https://static.wixstatic.com/media/11d65c_d742e856b62448428068d08d3f0e4955~mv2.png?originWidth=1152&originHeight=768",
    description: "Internal tooling and AI automation dashboard for a high-growth logistics firm."
  },
  {
    id: 3,
    title: "Aura Skincare",
    category: "CRO / Growth",
    metric: "8.5% Conv. Rate",
    image: "https://static.wixstatic.com/media/11d65c_60a1f1e5969a409bafea27efcfeb4339~mv2.png?originWidth=1152&originHeight=768",
    description: "Strategic conversion rate optimization campaign focusing on mobile checkout flow."
  },
  {
    id: 4,
    title: "Neon Energy",
    category: "Web App / React",
    metric: "10k+ Users",
    image: "https://static.wixstatic.com/media/11d65c_a9d56e17f097490694cbc01281ef0f64~mv2.png?originWidth=1152&originHeight=768",
    description: "Direct-to-consumer subscription platform with complex recurring billing logic."
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Strategy",
    description: "We begin by deconstructing your business goals. I analyze your current metrics, identify bottlenecks, and architect a roadmap for scalable growth.",
    icon: <BarChart className="w-6 h-6" />
  },
  {
    step: "02",
    title: "Design",
    description: "Visualizing the solution. I craft high-fidelity interfaces that prioritize user experience and brand authority, ensuring every pixel serves a purpose.",
    icon: <Palette className="w-6 h-6" />
  },
  {
    step: "03",
    title: "Build",
    description: "Execution mode. Using modern frameworks and clean code, I develop robust systems that are secure, fast, and easy to maintain.",
    icon: <Code className="w-6 h-6" />
  },
  {
    step: "04",
    title: "Optimize",
    description: "Launch is just the beginning. We rigorously test, gather data, and refine the experience to maximize conversion rates and performance.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    step: "05",
    title: "Scale",
    description: "Preparing for the future. I implement automation and infrastructure improvements that allow your business to handle 10x growth effortlessly.",
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const WHY_WORK_POINTS = [
  "I build systems, not just pages.",
  "Conversion-first thinking embedded in code.",
  "Technical mastery meets strategic vision.",
  "Direct partnership, no middle-management bloat."
];

const TESTIMONIALS_DATA = [
  {
    name: "Sarah Jenkins",
    role: "CEO, Lumina Fashion",
    text: "The headless store architecture completely transformed our load times. Our conversion rate doubled in the first month.",
    image: "https://static.wixstatic.com/media/11d65c_70ec9e8ef98c4c70af1a0f6a2fda17d6~mv2.png?originWidth=128&originHeight=128"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, TechStream",
    text: "Rare to find a developer who understands business strategy this well. The AI automations saved us 20 hours a week.",
    image: "https://static.wixstatic.com/media/11d65c_c0943c2caf90404fab5cc602f9863184~mv2.png?originWidth=128&originHeight=128"
  },
  {
    name: "Elena Rodriguez",
    role: "Director, Pure Organics",
    text: "Professional, fast, and incredibly talented. The new design elevated our brand to a premium level instantly.",
    image: "https://static.wixstatic.com/media/11d65c_d8d1d2f2e89140dd888bb29fdd6438f6~mv2.png?originWidth=128&originHeight=128"
  }
];

// --- UTILITY COMPONENTS ---

const AnimatedCounter = ({ value, prefix = "" }: { value: string, prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  const count = useSpring(0, { duration: 2000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, numericValue, count]);

  useEffect(() => {
    return count.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [count]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const MagneticButton = ({ children, className, variant = "primary", onClick }: { children: React.ReactNode, className?: string, variant?: "primary" | "secondary", onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group rounded-full px-8 py-4 font-medium text-lg transition-all duration-300 ${
        variant === "primary"
          ? "bg-electric-blue text-primary-foreground hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          : "bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-electric-blue/50"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-white/20 z-0"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, x: -100 }}
          className="absolute top-[-30%] left-[-15%] w-[600px] h-[600px] bg-shopify-green/8 rounded-full blur-[150px]"
        />
        <motion.div
          style={{ y: y2, x: 100 }}
          className="absolute bottom-[-30%] right-[-15%] w-[500px] h-[500px] bg-electric-blue/8 rounded-full blur-[150px]"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 max-w-[100rem] mx-auto">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-electric-blue/30 bg-electric-blue/5 px-4 py-2 text-sm text-electric-blue backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-shopify-green">High-Converting</span> Shopify Stores & Smart Systems
          </motion.h1>

          <motion.p
            className="font-paragraph text-lg md:text-xl text-secondary-foreground max-w-2xl mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {HERO_DATA.subtext}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <MagneticButton variant="primary">
              {HERO_DATA.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton 
              variant="secondary"
              onClick={() => {
                const phoneNumber = '923105390537';
                const message = 'Hello I need help to...';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              {HERO_DATA.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary-foreground flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-electric-blue to-transparent"></div>
      </motion.div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section className="py-20 border-y border-foreground/10 bg-black/20 backdrop-blur-sm relative z-20">
      <div className="container max-w-[100rem] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {TRUST_STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-heading"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} />
              </motion.div>
              <span className="text-sm md:text-base text-secondary-foreground uppercase tracking-wider font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StrategicPartnerSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container max-w-[100rem] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground font-heading leading-tight mb-8">
            Not just a developer. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-shopify-green">A Strategic Partner.</span>
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-secondary-foreground font-light">
            <p>I build systems, not just pages.</p>
            <p>Conversion-first thinking embedded in code.</p>
            <p>Technical mastery meets strategic vision.</p>
            <p>Direct partnership, no middle-management bloat.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WhyWorkSection = () => {
  return (
    <section className="py-32 bg-[#05050A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-soft-purple/10 via-transparent to-transparent opacity-50" />

      <div className="container max-w-[100rem] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground font-heading leading-tight mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Not just a developer. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-shopify-green">A Strategic Partner.</span>
            </motion.h2>

            <div className="space-y-8">
              {WHY_WORK_POINTS.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center border border-foreground/10 text-electric-blue shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-xl md:text-2xl text-secondary-foreground font-light">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-foreground/10 bg-foreground/5">
             <div className="absolute inset-0 p-8 font-mono text-sm text-electric-blue/40 overflow-hidden opacity-50">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="whitespace-nowrap mb-2">
                    {`<Component index={${i}} strategy="conversion-first" optimization={true} />`}
                  </div>
                ))}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent" />

             <div className="absolute bottom-0 left-0 right-0 p-12">
                <div className="bg-black/50 backdrop-blur-xl border border-foreground/10 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="w-8 h-8 text-soft-purple" />
                    <h3 className="text-xl font-bold text-foreground">Enterprise Grade Quality</h3>
                  </div>
                  <p className="text-secondary-foreground">
                    Every line of code is written with scalability, security, and performance in mind. No shortcuts, just robust engineering.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CTASection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="py-32 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-foreground/10 to-foreground/5 border border-foreground/10 rounded-3xl p-12 md:p-24 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-electric-blue/20 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground font-heading mb-8 relative z-10">
            Ready to <span className="text-electric-blue">Scale</span> Your Store?
          </h2>
          <p className="text-xl text-secondary-foreground mb-10 max-w-2xl mx-auto relative z-10">
            Let's build a system that works as hard as you do. Book a discovery call and let's discuss your growth strategy.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <MagneticButton 
              className="w-full sm:w-auto"
              onClick={() => {
                const phoneNumber = '923105390537';
                const message = 'Hello I need help to...';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Work With Me <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-electric-blue selection:text-black">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Header />

      <main className="relative">
        <HeroSection />
        <TrustSection />
        <StrategicPartnerSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhyWorkSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
