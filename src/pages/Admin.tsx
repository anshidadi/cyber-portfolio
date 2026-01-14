import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Upload,
  FolderOpen,
  ExternalLink,
  Github,
  Star,
  ArrowLeft,
  Briefcase,
  Code
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import { adminApi } from '@/lib/adminApi';
import { toast } from 'sonner';
import ParticleBackground from '@/components/ParticleBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ADMIN_PASSWORD = '8086';

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

interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
  display_order: number;
}

const Admin = () => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  
  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNewProject, setIsAddingNewProject] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Skills state
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);

  const emptyProject: Omit<Project, 'id'> = {
    title: '',
    description: '',
    image_url: null,
    technologies: [],
    category: 'Web Development',
    live_url: null,
    github_url: null,
    featured: false,
    display_order: 0,
  };

  const emptySkill: Omit<Skill, 'id'> = {
    name: '',
    level: 80,
    color: 'cyan',
    display_order: 0,
  };

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>(emptyProject);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>(emptySkill);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }
    fetchProjects();
    fetchSkills();
  }, [isAdmin, navigate]);

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch projects');
      console.error(error);
    } else {
      setProjects(data || []);
    }
    setIsLoadingProjects(false);
  };

  const fetchSkills = async () => {
    setIsLoadingSkills(true);
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch skills');
      console.error(error);
    } else {
      setSkills(data || []);
    }
    setIsLoadingSkills(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleImageUpload = async (file: File, isEdit: boolean = false) => {
    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, file);

    if (uploadError) {
      toast.error('Failed to upload image');
      console.error(uploadError);
      setUploadingImage(false);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);

    setUploadingImage(false);
    
    if (isEdit && editingProject) {
      setEditingProject({ ...editingProject, image_url: urlData.publicUrl });
    } else {
      setNewProject({ ...newProject, image_url: urlData.publicUrl });
    }
    
    return urlData.publicUrl;
  };

  // Project CRUD
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      toast.error('Title and description are required');
      return;
    }

    try {
      await adminApi({
        action: 'insert',
        table: 'projects',
        data: {
          ...newProject,
          display_order: projects.length,
        },
      }, ADMIN_PASSWORD);
      
      toast.success('Project added successfully');
      setNewProject(emptyProject);
      setIsAddingNewProject(false);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to add project');
      console.error(error);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;

    try {
      await adminApi({
        action: 'update',
        table: 'projects',
        id: editingProject.id,
        data: {
          title: editingProject.title,
          description: editingProject.description,
          image_url: editingProject.image_url,
          technologies: editingProject.technologies,
          category: editingProject.category,
          live_url: editingProject.live_url,
          github_url: editingProject.github_url,
          featured: editingProject.featured,
          display_order: editingProject.display_order,
        },
      }, ADMIN_PASSWORD);
      
      toast.success('Project updated successfully');
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to update project');
      console.error(error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await adminApi({
        action: 'delete',
        table: 'projects',
        id,
      }, ADMIN_PASSWORD);
      
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name) {
      toast.error('Skill name is required');
      return;
    }

    try {
      await adminApi({
        action: 'insert',
        table: 'skills',
        data: {
          ...newSkill,
          display_order: skills.length,
        },
      }, ADMIN_PASSWORD);
      
      toast.success('Skill added successfully');
      setNewSkill(emptySkill);
      setIsAddingNewSkill(false);
      fetchSkills();
    } catch (error) {
      toast.error('Failed to add skill');
      console.error(error);
    }
  };

  const handleUpdateSkill = async () => {
    if (!editingSkill) return;

    try {
      await adminApi({
        action: 'update',
        table: 'skills',
        id: editingSkill.id,
        data: {
          name: editingSkill.name,
          level: editingSkill.level,
          color: editingSkill.color,
          display_order: editingSkill.display_order,
        },
      }, ADMIN_PASSWORD);
      
      toast.success('Skill updated successfully');
      setEditingSkill(null);
      fetchSkills();
    } catch (error) {
      toast.error('Failed to update skill');
      console.error(error);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await adminApi({
        action: 'delete',
        table: 'skills',
        id,
      }, ADMIN_PASSWORD);
      
      toast.success('Skill deleted successfully');
      fetchSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
      console.error(error);
    }
  };

  const categories = [
    'Web Development',
    'AI Application',
    'Cybersecurity',
    'Game Development',
    'Mobile App',
    'Other',
  ];

  const skillColors = [
    { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  ];

  if (!isAdmin) return null;

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="glass-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-xl font-display font-bold gradient-text">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg border border-border hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="glass-card mb-8">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold">
                  Manage <span className="gradient-text">Projects</span>
                </h2>
                <motion.button
                  onClick={() => setIsAddingNewProject(true)}
                  className="cyber-button flex items-center gap-2 text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                  Add Project
                </motion.button>
              </div>

              {/* Add New Project Form */}
              {isAddingNewProject && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-2xl cyber-border mb-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-display font-bold">New Project</h3>
                    <button
                      onClick={() => {
                        setIsAddingNewProject(false);
                        setNewProject(emptyProject);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Title *</label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                          placeholder="Project title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Description *</label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent min-h-[100px]"
                          placeholder="Project description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-background"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Technologies (comma separated)
                        </label>
                        <input
                          type="text"
                          value={newProject.technologies.join(', ')}
                          onChange={(e) => setNewProject({ 
                            ...newProject, 
                            technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                          })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                          placeholder="React, TypeScript, Node.js"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Project Image</label>
                        <div className="relative">
                          {newProject.image_url ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                              <img src={newProject.image_url} alt="Preview" className="w-full h-full object-cover" />
                              <button
                                onClick={() => setNewProject({ ...newProject, image_url: null })}
                                className="absolute top-2 right-2 p-2 glass-card rounded-full hover:bg-red-500/20"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center aspect-video glass-card rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
                              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">
                                {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file);
                                }}
                                disabled={uploadingImage}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Live URL</label>
                        <input
                          type="url"
                          value={newProject.live_url || ''}
                          onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value || null })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={newProject.github_url || ''}
                          onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value || null })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured-new"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <label htmlFor="featured-new" className="text-sm text-muted-foreground">Featured project</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => {
                        setIsAddingNewProject(false);
                        setNewProject(emptyProject);
                      }}
                      className="px-6 py-3 rounded-xl border border-border hover:border-muted-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      onClick={handleAddProject}
                      className="cyber-button flex items-center gap-2 text-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save className="w-4 h-4" />
                      Save Project
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Projects List */}
              {isLoadingProjects ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-2xl">
                  <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground">Click "Add Project" to create your first project</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card rounded-2xl overflow-hidden cyber-border"
                    >
                      {editingProject?.id === project.id ? (
                        <div className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
                                <input
                                  type="text"
                                  value={editingProject.title}
                                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                  className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                                <textarea
                                  value={editingProject.description}
                                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                  className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent min-h-[100px]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                                <select
                                  value={editingProject.category}
                                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                                  className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-background"
                                >
                                  {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Technologies</label>
                                <input
                                  type="text"
                                  value={editingProject.technologies.join(', ')}
                                  onChange={(e) => setEditingProject({ 
                                    ...editingProject, 
                                    technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                                  })}
                                  className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Image</label>
                                {editingProject.image_url ? (
                                  <div className="relative aspect-video rounded-xl overflow-hidden">
                                    <img src={editingProject.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                      onClick={() => setEditingProject({ ...editingProject, image_url: null })}
                                      className="absolute top-2 right-2 p-2 glass-card rounded-full hover:bg-red-500/20"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <label className="flex flex-col items-center justify-center aspect-video glass-card rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
                                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                    <span className="text-sm text-muted-foreground">Upload image</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleImageUpload(file, true);
                                      }}
                                    />
                                  </label>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Live URL</label>
                                <input
                                  type="url"
                                  value={editingProject.live_url || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value || null })}
                                  className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">GitHub URL</label>
                                <input
                                  type="url"
                                  value={editingProject.github_url || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value || null })}
                                  className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`featured-${project.id}`}
                                  checked={editingProject.featured}
                                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                                  className="w-4 h-4"
                                />
                                <label htmlFor={`featured-${project.id}`} className="text-sm text-muted-foreground">Featured</label>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-4 mt-6">
                            <button
                              onClick={() => setEditingProject(null)}
                              className="px-6 py-3 rounded-xl border border-border hover:border-muted-foreground transition-colors"
                            >
                              Cancel
                            </button>
                            <motion.button
                              onClick={handleUpdateProject}
                              className="cyber-button flex items-center gap-2 text-primary"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row">
                          {project.image_url && (
                            <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {project.featured && (
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  )}
                                  <span className="text-xs font-medium text-primary">{project.category}</span>
                                </div>
                                <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {project.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 text-xs glass-card rounded-full text-muted-foreground">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex gap-3">
                                  {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                                      <ExternalLink className="w-4 h-4" /> Live
                                    </a>
                                  )}
                                  {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                      <Github className="w-4 h-4" /> Code
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingProject(project)}
                                  className="p-2 glass-card rounded-lg hover:border-primary border border-transparent transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="p-2 glass-card rounded-lg hover:border-red-500 hover:text-red-500 border border-transparent transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold">
                  Manage <span className="gradient-text">Skills</span>
                </h2>
                <motion.button
                  onClick={() => setIsAddingNewSkill(true)}
                  className="cyber-button flex items-center gap-2 text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                  Add Skill
                </motion.button>
              </div>

              {/* Add New Skill Form */}
              {isAddingNewSkill && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-2xl cyber-border mb-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-display font-bold">New Skill</h3>
                    <button
                      onClick={() => {
                        setIsAddingNewSkill(false);
                        setNewSkill(emptySkill);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Skill Name *</label>
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          className="w-full px-4 py-3 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                          placeholder="e.g., React, Python, UI/UX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Proficiency Level: {newSkill.level}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Color</label>
                        <div className="flex flex-wrap gap-2">
                          {skillColors.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => setNewSkill({ ...newSkill, color: color.value })}
                              className={`w-8 h-8 rounded-full ${color.class} ${
                                newSkill.color === color.value ? 'ring-2 ring-offset-2 ring-offset-background ring-white' : ''
                              }`}
                              title={color.label}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => {
                        setIsAddingNewSkill(false);
                        setNewSkill(emptySkill);
                      }}
                      className="px-6 py-3 rounded-xl border border-border hover:border-muted-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      onClick={handleAddSkill}
                      className="cyber-button flex items-center gap-2 text-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save className="w-4 h-4" />
                      Save Skill
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Skills List */}
              {isLoadingSkills ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : skills.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-2xl">
                  <Code className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">No skills yet</h3>
                  <p className="text-muted-foreground">Click "Add Skill" to add your first skill</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card rounded-2xl p-6 cyber-border"
                    >
                      {editingSkill?.id === skill.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editingSkill.name}
                            onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                            className="w-full px-4 py-2 glass-card rounded-xl border border-border focus:border-primary focus:outline-none bg-transparent"
                          />
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Level: {editingSkill.level}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={editingSkill.level}
                              onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {skillColors.map((color) => (
                              <button
                                key={color.value}
                                onClick={() => setEditingSkill({ ...editingSkill, color: color.value })}
                                className={`w-6 h-6 rounded-full ${color.class} ${
                                  editingSkill.color === color.value ? 'ring-2 ring-offset-2 ring-offset-background ring-white' : ''
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingSkill(null)}
                              className="flex-1 px-4 py-2 rounded-xl border border-border hover:border-muted-foreground transition-colors text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdateSkill}
                              className="flex-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold">{skill.name}</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingSkill(skill)}
                                className="p-2 glass-card rounded-lg hover:border-primary border border-transparent transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="p-2 glass-card rounded-lg hover:border-red-500 hover:text-red-500 border border-transparent transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`absolute inset-y-0 left-0 rounded-full bg-${skill.color}-500`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{skill.level}% Proficiency</p>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Admin;