'use client';

import { useEditorStore } from '@/stores/editorStore';
import Link from 'next/link';
import {
  Undo2, Redo2, Save, Download, Sparkles, Settings,
  PanelLeftClose, PanelRightClose, LayoutDashboard,
  Camera, Film
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

export default function EditorToolbar() {
  const {
    projectName, setProjectName,
    undo, redo, canUndo, canRedo,
    messages, platform, contacts, phoneSettings
  } = useEditorStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Autosave
  const saveProject = useCallback(() => {
    try {
      const state = useEditorStore.getState();
      const projectData = {
        projectId: state.projectId,
        projectName: state.projectName,
        platform: state.platform,
        messages: state.messages,
        contacts: state.contacts,
        phoneSettings: state.phoneSettings,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(`chatforge_project_${state.projectId}`, JSON.stringify(projectData));
      
      // Save to project list
      const projectList = JSON.parse(localStorage.getItem('chatforge_projects') || '[]');
      const existingIndex = projectList.findIndex((p: { id: string }) => p.id === state.projectId);
      const listEntry = {
        id: state.projectId,
        name: state.projectName,
        platform: state.platform,
        messageCount: state.messages.length,
        updatedAt: new Date().toISOString(),
      };
      if (existingIndex >= 0) {
        projectList[existingIndex] = listEntry;
      } else {
        projectList.unshift(listEntry);
      }
      localStorage.setItem('chatforge_projects', JSON.stringify(projectList));

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (e) {
      console.error('Save failed:', e);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(saveProject, 30000);
    return () => clearInterval(interval);
  }, [saveProject]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) redo();
            else undo();
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            saveProject();
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, saveProject]);

  const handleExportScreenshot = async () => {
    const phoneEl = document.querySelector('.phone-screen');
    if (!phoneEl) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(phoneEl as HTMLElement, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `chatforge-${platform}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  return (
    <div className="h-14 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 mr-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold hidden sm:block">
            Chat<span className="accent-text">Forge</span>
          </span>
        </Link>

        <div className="h-5 w-px bg-[var(--border)]" />

        {/* Project Name */}
        {isEditing ? (
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            className="px-2 py-1 text-sm bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] w-48"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {projectName}
          </button>
        )}
      </div>

      {/* Center — Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo()}
          className="p-2 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo()}
          className="p-2 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-[var(--border)] mx-1" />

        <button
          onClick={saveProject}
          className={`p-2 rounded-lg transition-all ${
            isSaved
              ? 'text-[var(--success)] bg-[var(--success)]/10'
              : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          title="Save (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      {/* Right — Export & Nav */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleExportScreenshot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
        >
          <Camera className="w-3.5 h-3.5" />
          Screenshot
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-medium hover:bg-[var(--accent-hover)] transition-all">
          <Film className="w-3.5 h-3.5" />
          Export Video
        </button>

        <div className="h-5 w-px bg-[var(--border)] mx-1" />

        <Link
          href="/dashboard"
          className="p-2 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          title="Dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
