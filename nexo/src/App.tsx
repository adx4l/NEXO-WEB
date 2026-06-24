import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';

// Placeholder components for other pages
const WorkspacePage = () => (
  <div className="flex-1 flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Workspace</h1>
      <p className="text-foregroundMuted">Canvas interactivo en desarrollo</p>
    </div>
  </div>
);

const NotebookPage = () => (
  <div className="flex-1 flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Cuaderno Inteligente</h1>
      <p className="text-foregroundMuted">Sistema de notas estructurado en desarrollo</p>
    </div>
  </div>
);

const FlashcardsPage = () => (
  <div className="flex-1 flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Flashcards</h1>
      <p className="text-foregroundMuted">Sistema de repaso espaciado en desarrollo</p>
    </div>
  </div>
);

const ChatPage = () => (
  <div className="flex-1 flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">IA Chat</h1>
      <p className="text-foregroundMuted">Asistente de IA contextual en desarrollo</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="flex-1 flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Configuración</h1>
      <p className="text-foregroundMuted">Panel de configuración en desarrollo</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/workspaces" element={<Dashboard />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
