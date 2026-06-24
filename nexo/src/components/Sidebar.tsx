import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  BookOpen, 
  Brain, 
  MessageSquare, 
  Settings,
  Plus,
  LogOut,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

interface SidebarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView = 'dashboard',
  onNavigate 
}) => {
  const navigate = useNavigate();
  const { currentWorkspace, workspaces, setCurrentWorkspace } = useAppStore();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'workspaces', icon: FolderOpen, label: 'Workspaces' },
    { id: 'notebook', icon: BookOpen, label: 'Cuaderno' },
    { id: 'flashcards', icon: Brain, label: 'Flashcards' },
    { id: 'chat', icon: MessageSquare, label: 'IA Chat' },
    { id: 'settings', icon: Settings, label: 'Configuración' },
  ];

  const handleNavigation = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      navigate(`/${view}`);
    }
  };

  return (
    <aside className="w-16 lg:w-64 bg-surface border-r border-border flex flex-col h-full transition-all duration-300">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-foreground font-semibold text-lg hidden lg:block">
            Nexo
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foregroundMuted hover:bg-surfaceHighlight hover:text-foreground'
                }
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="hidden lg:block text-sm font-medium">
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary hidden lg:block" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Workspaces Quick Access */}
      <div className="p-2 border-t border-border">
        <div className="hidden lg:block px-3 py-2 text-xs font-semibold text-foregroundMuted uppercase tracking-wider">
          Workspaces
        </div>
        <div className="space-y-1">
          {workspaces.slice(0, 3).map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                setCurrentWorkspace(ws);
                handleNavigation('workspace');
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg
                transition-all duration-200
                ${currentWorkspace?.id === ws.id
                  ? 'bg-surfaceHighlight text-foreground'
                  : 'text-foregroundMuted hover:bg-surfaceHighlight hover:text-foreground'
                }
              `}
            >
              <FolderOpen size={16} className="flex-shrink-0" />
              <span className="hidden lg:block text-sm truncate">{ws.title}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavigation('workspaces')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-foregroundMuted hover:bg-surfaceHighlight hover:text-foreground transition-all duration-200"
          >
            <Plus size={16} className="flex-shrink-0" />
            <span className="hidden lg:block text-sm">Nuevo Workspace</span>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-2 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foregroundMuted hover:bg-surfaceHighlight hover:text-foreground transition-all duration-200">
          <User size={20} className="flex-shrink-0" />
          <span className="hidden lg:block text-sm font-medium">Perfil</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foregroundMuted hover:bg-surfaceHighlight hover:text-foreground transition-all duration-200">
          <LogOut size={20} className="flex-shrink-0" />
          <span className="hidden lg:block text-sm font-medium">Salir</span>
        </button>
      </div>
    </aside>
  );
};
