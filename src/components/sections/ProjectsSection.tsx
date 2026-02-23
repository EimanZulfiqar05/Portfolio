import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { PortfolioProjects } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<PortfolioProjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<PortfolioProjects>('portfolioprojects', [], { limit: 6 });
    setProjects(result.items);
    setIsLoading(false);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-soft-purple/5 to-background" />

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
            className="inline-block font-paragraph text-sm font-bold text-soft-purple uppercase tracking-wider mb-4"
          >
            Portfolio
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-soft-purple to-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="font-paragraph text-lg text-foreground/60 max-w-3xl mx-auto">
            Real results from real projects. Strategic development that drives measurable growth.
          </p>
        </motion.div>

        <div className="min-h-[800px]">
          {isLoading ? null : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: PortfolioProjects;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  const technologies = project.technologiesUsed?.split(',').map(t => t.trim()).filter(Boolean) || [];
  const metrics = project.keyMetrics?.split('\n').filter(m => m.trim()) || [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-foreground/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/10 hover:border-soft-purple/30 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-foreground/5">
        {project.projectImages && (
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <Image
              src={project.projectImages}
              alt={project.projectTitle || 'Project'}
              width={800}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent flex items-end p-6"
        >
          {metrics.length > 0 && (
            <div className="space-y-2">
              {metrics.slice(0, 2).map((metric, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="font-paragraph text-sm text-primary font-bold"
                >
                  {metric}
                </motion.p>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground group-hover:text-soft-purple transition-colors duration-300">
            {project.projectTitle}
          </h3>
          {project.projectUrl && (
            <motion.a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg bg-soft-purple/10 border border-soft-purple/20 hover:bg-soft-purple/20 hover:border-soft-purple/40 flex items-center justify-center text-soft-purple transition-all duration-300"
              aria-label="View project"
            >
              <ExternalLink size={18} />
            </motion.a>
          )}
        </div>

        {project.completionDate && (
          <div className="flex items-center gap-2 text-foreground/50 mb-4">
            <Calendar size={14} />
            <span className="font-paragraph text-sm">
              {format(new Date(project.completionDate), 'MMMM yyyy')}
            </span>
          </div>
        )}

        <p className="font-paragraph text-base text-foreground/70 mb-6 leading-relaxed line-clamp-3">
          {project.caseStudyDescription}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-soft-purple/10 border border-soft-purple/20 font-paragraph text-xs text-soft-purple font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-soft-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
