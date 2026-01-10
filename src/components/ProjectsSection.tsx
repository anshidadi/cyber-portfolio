import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'SecureVault Pro',
    category: 'Cybersecurity',
    description: 'Enterprise-grade password management and security audit tool with AI-powered vulnerability detection.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    technologies: ['Python', 'React', 'PostgreSQL', 'Docker'],
    color: 'primary',
  },
  {
    title: 'AI Content Studio',
    category: 'AI Application',
    description: 'Intelligent content generation platform powered by GPT-4 with custom training capabilities.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'OpenAI', 'TypeScript', 'MongoDB'],
    color: 'secondary',
  },
  {
    title: 'CyberDefend Dashboard',
    category: 'Security Tool',
    description: 'Real-time network monitoring and threat detection system with automated response protocols.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'WebSocket', 'Redis'],
    color: 'accent',
  },
  {
    title: 'Space Runner 2D',
    category: 'Game',
    description: 'Fast-paced endless runner game with procedurally generated levels and online leaderboards.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    technologies: ['Unity', 'C#', 'Firebase', 'Photoshop'],
    color: 'primary',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Web Application',
    description: 'Full-featured online store with secure payments, inventory management, and analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'Stripe', 'Prisma', 'AWS'],
    color: 'secondary',
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-card rounded-full text-primary font-mono text-sm mb-4">
            {'// PORTFOLIO'}
          </span>
          <h2 className="section-title">
            Featured <span className="gradient-text-cyan-purple">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work spanning cybersecurity, web development, AI, and game development
          </p>
        </motion.div>

        {/* Featured Project Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass-card p-4 md:p-8 rounded-3xl cyber-border overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video rounded-2xl overflow-hidden"
              >
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium glass-card text-${projects[currentIndex].color}`}>
                  {projects[currentIndex].category}
                </span>
              </motion.div>

              {/* Content */}
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {projects[currentIndex].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[currentIndex].technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 glass-card rounded-full text-sm font-medium text-${projects[currentIndex].color}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    className="cyber-button flex items-center gap-2 text-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href="#"
                    className="px-6 py-4 rounded-lg border border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2 font-display font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={prevProject}
                  className="p-3 glass-card rounded-xl hover-glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </motion.button>
                <motion.button
                  onClick={nextProject}
                  className="p-3 glass-card rounded-xl hover-glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl overflow-hidden hover-glow group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className={`text-xs font-medium text-${project.color} mb-2 block`}>
                  {project.category}
                </span>
                <h4 className="font-display font-bold mb-2">{project.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
