import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import profileImage from '@/assets/profile-photo.jpeg';

const HeroSection = () => {
  const floatingShapes = [
    { size: 60, delay: 0, duration: 8, x: '10%', y: '20%', color: 'primary' },
    { size: 40, delay: 2, duration: 6, x: '80%', y: '30%', color: 'secondary' },
    { size: 50, delay: 1, duration: 7, x: '70%', y: '70%', color: 'accent' },
    { size: 30, delay: 3, duration: 9, x: '20%', y: '60%', color: 'primary' },
    { size: 45, delay: 1.5, duration: 8, x: '85%', y: '80%', color: 'secondary' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating 3D Shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute w-${shape.size} h-${shape.size} rounded-lg border-2 border-${shape.color}/30`}
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className={`w-full h-full rounded-lg bg-gradient-to-br from-${shape.color}/10 to-transparent backdrop-blur-sm`}
          />
        </motion.div>
      ))}

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-gradient blur-3xl opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Terminal-style intro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 glass-card rounded-full"
            >
              <span className="text-primary font-mono text-sm">
                {'>'} Hello, World! I'm
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-foreground">MUHAMMED</span>
              <br />
              <span className="gradient-text">ANSHID KT</span>
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {['Cybersecurity Engineer', 'Web Developer', 'AI Developer'].map(
                (role, index) => (
                  <span
                    key={role}
                    className={`px-4 py-2 text-sm font-medium rounded-full glass-card border ${
                      index === 0
                        ? 'border-primary/50 text-primary'
                        : index === 1
                        ? 'border-secondary/50 text-secondary'
                        : 'border-accent/50 text-accent'
                    }`}
                  >
                    {role}
                  </span>
                )
              )}
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Crafting secure, intelligent, and visually stunning digital experiences 
              from Kerala, India. Turning complex challenges into elegant solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.a
                href="#contact"
                className="cyber-button flex items-center gap-2 text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </motion.a>
              <motion.a
                href="#projects"
                className="px-8 py-4 font-display font-semibold rounded-lg border border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            {/* Animated rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-80 h-80 md:w-96 md:h-96 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border border-secondary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border border-accent/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Profile image container */}
            <motion.div
              className="relative z-10 w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden animated-border"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={profileImage}
                alt="Muhammed Anshid KT"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -left-4 top-1/4 glass-card px-4 py-2 rounded-full"
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm font-medium text-primary">🔒 Security Expert</span>
            </motion.div>
            <motion.div
              className="absolute -right-4 top-1/2 glass-card px-4 py-2 rounded-full"
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="text-sm font-medium text-secondary">🤖 AI Developer</span>
            </motion.div>
            <motion.div
              className="absolute left-1/4 -bottom-4 glass-card px-4 py-2 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="text-sm font-medium text-accent">🎮 Game Dev</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
