import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Settings } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const { isAdmin, login } = useAdmin();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success('Admin access granted!');
      setShowPasswordModal(false);
      setPassword('');
      navigate('/admin');
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <>
      <footer className="py-8 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-xl font-bold gradient-text-cyan-purple"
            >
              ANSHID
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-muted-foreground flex items-center gap-1"
            >
              © {currentYear} Made with{' '}
              <Heart className="w-4 h-4 text-destructive fill-destructive" /> by
              Muhammed Anshid KT
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6 text-sm text-muted-foreground"
            >
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-primary transition-colors">
                Contact
              </a>
              <button
                onClick={handleAdminClick}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors group"
                title="Admin Access"
              >
                <Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </motion.div>
          </div>
        </div>
      </footer>

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="glass-card border-border">
          <DialogHeader>
            <DialogTitle className="text-center gradient-text">Admin Access</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none transition-colors bg-transparent text-foreground"
              autoFocus
            />
            <button
              type="submit"
              disabled={!password}
              className="w-full cyber-button text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Access Admin Panel
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;