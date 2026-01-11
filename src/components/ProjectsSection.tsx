import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  category: string;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  display_order: number;
}

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setIsLoading(false);
  };

  const nextProject = () => {
    if (projects.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const prevProject = () => {
    if (projects.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cybersecurity':
        return 'primary';
      case 'AI Application':
        return 'secondary';
      case 'Game Development':
        return 'accent';
      default:
        return 'primary';
    }
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
        <div className="absolute inset-0 cyber-grid opacity-10" />
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
          </motion.div>
          <div className="text-center py-20 glass-card rounded-2xl">
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">Projects will be displayed here</p>
          </div>
        </div>
      </section>
    );
  }

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
                {projects[currentIndex]?.image_url ? (
                  <img
                    src={projects[currentIndex].image_url}
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <FolderOpen className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium glass-card text-${getCategoryColor(projects[currentIndex]?.category)}`}>
                  {projects[currentIndex]?.category}
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
                  {projects[currentIndex]?.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {projects[currentIndex]?.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[currentIndex]?.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 glass-card rounded-full text-sm font-medium text-${getCategoryColor(projects[currentIndex]?.category)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {projects[currentIndex]?.live_url && (
                    <motion.a
                      href={projects[currentIndex].live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button flex items-center gap-2 text-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                  {projects[currentIndex]?.github_url && (
                    <motion.a
                      href={projects[currentIndex].github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 rounded-lg border border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2 font-display font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                  )}
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
        {projects.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl overflow-hidden hover-glow group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FolderOpen className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className={`text-xs font-medium text-${getCategoryColor(project.category)} mb-2 block`}>
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
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
