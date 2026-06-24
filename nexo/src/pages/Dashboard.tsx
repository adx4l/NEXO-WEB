import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  FolderOpen, 
  Clock, 
  TrendingUp,
  Brain,
  FileText,
  MoreVertical,
  Search
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import type { Workspace } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { workspaces, addWorkspace, setCurrentWorkspace } = useAppStore();
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('');

  const handleCreateWorkspace = () => {
    if (!newWorkspaceTitle.trim()) return;
    
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      user_id: 'current-user', // This would come from auth
      title: newWorkspaceTitle,
      layout_config: {
        grid_size: 20,
        snap_to_grid: true,
        show_grid: true,
        zoom_level: 1,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    addWorkspace(newWorkspace);
    setNewWorkspaceTitle('');
    setShowNewWorkspaceModal(false);
    setCurrentWorkspace(newWorkspace);
    navigate('/workspace');
  };

  const recentWorkspaces = workspaces.slice(0, 6);
  
  const stats = {
    totalWorkspaces: workspaces.length,
    totalFlashcards: 0,
    studyHours: 0,
    activeProjects: workspaces.filter(w => w.updated_at && new Date(w.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-foregroundMuted mt-1">
              Bienvenido de nuevo a tu espacio de estudio
            </p>
          </div>
          <button
            onClick={() => setShowNewWorkspaceModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nuevo Workspace</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalWorkspaces}</p>
                <p className="text-sm text-foregroundMuted">Workspaces</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Brain size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalFlashcards}</p>
                <p className="text-sm text-foregroundMuted">Flashcards</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.studyHours}h</p>
                <p className="text-sm text-foregroundMuted">Horas de Estudio</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.activeProjects}</p>
                <p className="text-sm text-foregroundMuted">Activos esta semana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setShowNewWorkspaceModal(true)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surfaceHighlight hover:bg-surface border border-border transition-all duration-200"
            >
              <Plus size={24} className="text-primary" />
              <span className="text-sm text-foreground">Crear Workspace</span>
            </button>
            <button
              onClick={() => navigate('/notebook')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surfaceHighlight hover:bg-surface border border-border transition-all duration-200"
            >
              <FileText size={24} className="text-secondary" />
              <span className="text-sm text-foreground">Abrir Cuaderno</span>
            </button>
            <button
              onClick={() => navigate('/flashcards')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surfaceHighlight hover:bg-surface border border-border transition-all duration-200"
            >
              <Brain size={24} className="text-accent" />
              <span className="text-sm text-foreground">Estudiar Flashcards</span>
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surfaceHighlight hover:bg-surface border border-border transition-all duration-200"
            >
              <Search size={24} className="text-green-500" />
              <span className="text-sm text-foreground">Preguntar a IA</span>
            </button>
          </div>
        </div>

        {/* Recent Workspaces */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Workspaces Recientes</h2>
            <button
              onClick={() => navigate('/workspaces')}
              className="text-sm text-primary hover:text-primaryHover transition-colors"
            >
              Ver todos
            </button>
          </div>
          
          {recentWorkspaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentWorkspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  onClick={() => {
                    setCurrentWorkspace(workspace);
                    navigate('/workspace');
                  }}
                  className="card cursor-pointer hover:border-primary/50 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <FolderOpen size={20} className="text-white" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surfaceHighlight rounded">
                      <MoreVertical size={16} className="text-foregroundMuted" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{workspace.title}</h3>
                  <p className="text-sm text-foregroundMuted">
                    {workspace.updated_at 
                      ? `Actualizado ${new Date(workspace.updated_at).toLocaleDateString('es-ES')}`
                      : 'Recién creado'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <FolderOpen size={48} className="mx-auto text-foregroundMuted mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No hay workspaces aún
              </h3>
              <p className="text-foregroundMuted mb-4">
                Crea tu primer workspace para comenzar a organizar tu estudio
              </p>
              <button
                onClick={() => setShowNewWorkspaceModal(true)}
                className="btn-primary"
              >
                Crear Workspace
              </button>
            </div>
          )}
        </div>
      </main>

      {/* New Workspace Modal */}
      {showNewWorkspaceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md animate-scale-in">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Nuevo Workspace
            </h2>
            <input
              type="text"
              value={newWorkspaceTitle}
              onChange={(e) => setNewWorkspaceTitle(e.target.value)}
              placeholder="Nombre del workspace..."
              className="input-base w-full mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreateWorkspace()}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewWorkspaceModal(false);
                  setNewWorkspaceTitle('');
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateWorkspace}
                disabled={!newWorkspaceTitle.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
