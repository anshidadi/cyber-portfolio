import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  Brain, 
  Shield, 
  Search, 
  Gamepad2,
  ArrowRight 
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Custom Web App Development',
    description: 'Building scalable, responsive, and modern web applications tailored to your business needs using cutting-edge technologies.',
    features: ['React/Next.js', 'Full-Stack Solutions', 'API Development', 'Cloud Deployment'],
    color: 'primary',
  },
  {
    icon: Brain,
    title: 'AI-Powered Applications',
    description: 'Integrating artificial intelligence and machine learning to create smart, automated, and intelligent web solutions.',
    features: ['ChatBot Integration', 'ML Models', 'NLP Solutions', 'Predictive Analytics'],
    color: 'secondary',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security services to protect your web and mobile applications from modern cyber threats.',
    features: ['Security Audits', 'Vulnerability Assessment', 'Incident Response', 'Compliance'],
    color: 'accent',
  },
  {
    icon: Search,
    title: 'Penetration Testing',
    description: 'Professional ethical hacking services to identify and fix security vulnerabilities before malicious actors exploit them.',
    features: ['Web App Testing', 'Network Testing', 'API Security', 'Detailed Reports'],
    color: 'primary',
  },
  {
    icon: Gamepad2,
    title: '2D Game Development',
    description: 'Creating engaging and immersive 2D games with compelling gameplay mechanics and beautiful visuals.',
    features: ['Unity/Godot', 'Game Design', 'Character Animation', 'Cross-Platform'],
    color: 'secondary',
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-card rounded-full text-primary font-mono text-sm mb-4">
            {'// WHAT I OFFER'}
          </span>
          <h2 className="section-title">
            My <span className="gradient-text-cyan-purple">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional solutions tailored to bring your ideas to life with security and innovation at the forefront
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-2xl hover-glow group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${service.color}/10 group-hover:bg-${service.color}/20 transition-colors`}
                >
                  <service.icon className={`w-7 h-7 text-${service.color}`} />
                </div>

                <h3 className="text-xl font-display font-bold mb-3 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 text-sm font-medium text-${service.color} group-hover:gap-3 transition-all`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
