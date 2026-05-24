'use client';

import EditorToolbar from '@/components/editor/EditorToolbar';
import Sidebar from '@/components/editor/Sidebar';
import PhonePreview from '@/components/editor/PhonePreview';
import CustomizationPanel from '@/components/editor/CustomizationPanel';
import { useState } from 'react';
import { PanelLeftClose, PanelRightClose, PanelLeft, PanelRight } from 'lucide-react';

export default function EditorPage() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Toolbar */}
      <EditorToolbar />

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar Toggle (when collapsed) */}
        {!leftOpen && (
          <button
            onClick={() => setLeftOpen(true)}
            className="absolute left-2 top-2 z-20 p-2 rounded-lg glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}

        {/* Left Sidebar */}
        {leftOpen && (
          <div className="relative">
            <Sidebar />
            <button
              onClick={() => setLeftOpen(false)}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-all"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Center — Phone Preview */}
        <div className="flex-1 flex items-center justify-center overflow-auto bg-[var(--bg-primary)] relative">
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          <PhonePreview />
        </div>

        {/* Right Sidebar Toggle (when collapsed) */}
        {!rightOpen && (
          <button
            onClick={() => setRightOpen(true)}
            className="absolute right-2 top-2 z-20 p-2 rounded-lg glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <PanelRight className="w-4 h-4" />
          </button>
        )}

        {/* Right Sidebar */}
        {rightOpen && (
          <div className="relative">
            <CustomizationPanel />
            <button
              onClick={() => setRightOpen(false)}
              className="absolute top-2 left-2 z-10 p-1.5 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-all"
            >
              <PanelRightClose className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
