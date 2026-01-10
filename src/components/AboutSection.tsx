import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Code, Shield, Brain, Gamepad2 } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Protecting digital assets with cutting-edge security solutions',
      color: 'primary',
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building modern, responsive, and performant web applications',
      color: 'secondary',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Implementing intelligent features powered by machine learning',
      color: 'accent',
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      description: 'Creating engaging 2D games with immersive experiences',
      color: 'primary',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-card rounded-full text-primary font-mono text-sm mb-4">
            {'// ABOUT ME'}
          </span>
          <h2 className="section-title">
            Who <span className="gradient-text-cyan-purple">I Am</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate tech professional dedicated to creating secure and innovative digital solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl cyber-border">
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                Tech Enthusiast & Problem Solver
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm Muhammed Anshid KT, a versatile technology professional from Kerala, India. 
                My journey in tech spans across cybersecurity, web development, AI applications, 
                and game development. I believe in creating solutions that are not just functional, 
                but also secure and user-centric.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                With a deep understanding of security vulnerabilities and modern development practices, 
                I help businesses build robust digital products that stand the test of time. 
                My approach combines creativity with technical expertise to deliver exceptional results.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Kerala, India</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>anshidadi40@gmail.com</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover-glow group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${item.color}/10 group-hover:bg-${item.color}/20 transition-colors`}
                >
                  <item.icon className={`w-6 h-6 text-${item.color}`} />
                </div>
                <h4 className="font-display font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
