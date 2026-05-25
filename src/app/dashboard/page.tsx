'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus, Search, MoreHorizontal, Trash2, Copy,
  MessageSquare, Clock, Sparkles, LayoutDashboard,
  FolderOpen
} from 'lucide-react';

interface ProjectEntry {
  id: string;
  name: string;
  platform: string;
  messageCount: number;
  updatedAt: string;
}

const platformIcons: Record<string, string> = {
  whatsapp: '💬',
  imessage: '🍎',
  instagram: '📸',
  telegram: '✈️',
  discord: '🎮',
  snapchat: '👻',
  messenger: '💬',
  twitter: '𝕏',
};

const platformColors: Record<string, string> = {
  whatsapp: '#25D366',
  imessage: '#007AFF',
  instagram: '#E1306C',
  telegram: '#0088CC',
  discord: '#5865F2',
  snapchat: '#FFFC00',
  messenger: '#0084FF',
  twitter: '#1D9BF0',
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('chatforge_projects') || '[]');
    setProjects(stored);
  }, []);

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('chatforge_projects', JSON.stringify(updated));
    localStorage.removeItem(`chatforge_project_${id}`);
  };

  const duplicateProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    const newProject = {
      ...project,
      id: Math.random().toString(36).substring(2),
      name: `${project.name} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem('chatforge_projects', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Chat<span className="accent-text">Forge</span>
              </span>
            </Link>
            <div className="h-5 w-px bg-[var(--border)]" />
            <h1 className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </h1>
          </div>

          <Link href="/editor" className="btn-primary text-sm">
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* New Project Card */}
            <Link href="/editor">
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full min-h-[180px] flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent-subtle)] transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
                  <Plus className="w-6 h-6 text-[var(--text-tertiary)] group-hover:text-[var(--accent-light)]" />
                </div>
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent-light)]">
                  New Project
                </span>
              </motion.div>
            </Link>

            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] transition-all overflow-hidden"
              >
                {/* Preview Header */}
                <div
                  className="h-24 flex items-center justify-center relative"
                  style={{ background: `${platformColors[project.platform]}15` }}
                >
                  <span className="text-4xl">{platformIcons[project.platform] || '💬'}</span>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => duplicateProject(project.id)}
                      className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <Link href="/editor" className="block p-4">
                  <h3 className="text-sm font-semibold mb-1 truncate">{project.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {project.messageCount} msgs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-[var(--bg-elevated)] flex items-center justify-center mb-6">
              <FolderOpen className="w-10 h-10 text-[var(--text-tertiary)]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No projects yet</h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-md">
              Create your first fake chat conversation. Choose a platform, add messages, and export stunning screenshots or videos.
            </p>
            <Link href="/editor" className="btn-primary">
              <Plus className="w-4 h-4" />
              Create First Project
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
