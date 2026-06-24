import { create } from 'zustand';
import type { 
  User, 
  Workspace, 
  CanvasItem, 
  Document, 
  AIConversation, 
  Flashcard,
  Position,
  Size,
  CanvasItemType
} from '../types';

interface AppState {
  // State
  currentUser: User | null;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  canvasItems: CanvasItem[];
  documents: Document[];
  conversations: AIConversation[];
  flashcards: Flashcard[];
  isLoading: boolean;
  error: string | null;
  
  // Actions - Auth
  setCurrentUser: (user: User | null) => void;
  
  // Actions - Workspaces
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
  removeWorkspace: (id: string) => void;
  
  // Actions - Canvas Items
  setCanvasItems: (items: CanvasItem[]) => void;
  addCanvasItem: (item: CanvasItem) => void;
  updateCanvasItem: (id: string, updates: Partial<CanvasItem>) => void;
  updateCanvasItemPosition: (id: string, position: Position) => void;
  updateCanvasItemSize: (id: string, size: Size) => void;
  removeCanvasItem: (id: string) => void;
  
  // Actions - Documents
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
  
  // Actions - Conversations
  setConversations: (conversations: AIConversation[]) => void;
  addConversation: (conversation: AIConversation) => void;
  updateConversation: (id: string, updates: Partial<AIConversation>) => void;
  
  // Actions - Flashcards
  setFlashcards: (flashcards: Flashcard[]) => void;
  addFlashcard: (flashcard: Flashcard) => void;
  removeFlashcard: (id: string) => void;
  
  // Actions - UI State
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentUser: null,
  currentWorkspace: null,
  workspaces: [],
  canvasItems: [],
  documents: [],
  conversations: [],
  flashcards: [],
  isLoading: false,
  error: null,
  
  // Auth actions
  setCurrentUser: (user) => set({ currentUser: user }),
  
  // Workspace actions
  setWorkspaces: (workspaces) => set({ workspaces }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  addWorkspace: (workspace) => set((state) => ({ 
    workspaces: [workspace, ...state.workspaces] 
  })),
  updateWorkspace: (id, updates) => set((state) => ({
    workspaces: state.workspaces.map(w => w.id === id ? { ...w, ...updates } : w),
    currentWorkspace: state.currentWorkspace?.id === id 
      ? { ...state.currentWorkspace, ...updates } 
      : state.currentWorkspace
  })),
  removeWorkspace: (id) => set((state) => ({
    workspaces: state.workspaces.filter(w => w.id !== id),
    currentWorkspace: state.currentWorkspace?.id === id ? null : state.currentWorkspace
  })),
  
  // Canvas item actions
  setCanvasItems: (items) => set({ canvasItems: items }),
  addCanvasItem: (item) => set((state) => ({ 
    canvasItems: [...state.canvasItems, item] 
  })),
  updateCanvasItem: (id, updates) => set((state) => ({
    canvasItems: state.canvasItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  updateCanvasItemPosition: (id, position) => set((state) => ({
    canvasItems: state.canvasItems.map(item => 
      item.id === id ? { ...item, position } : item
    )
  })),
  updateCanvasItemSize: (id, size) => set((state) => ({
    canvasItems: state.canvasItems.map(item => 
      item.id === id ? { ...item, size } : item
    )
  })),
  removeCanvasItem: (id) => set((state) => ({
    canvasItems: state.canvasItems.filter(item => item.id !== id)
  })),
  
  // Document actions
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) => set((state) => ({ 
    documents: [...state.documents, document] 
  })),
  removeDocument: (id) => set((state) => ({
    documents: state.documents.filter(doc => doc.id !== id)
  })),
  
  // Conversation actions
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) => set((state) => ({ 
    conversations: [...state.conversations, conversation] 
  })),
  updateConversation: (id, updates) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, ...updates } : conv
    )
  })),
  
  // Flashcard actions
  setFlashcards: (flashcards) => set({ flashcards }),
  addFlashcard: (flashcard) => set((state) => ({ 
    flashcards: [...state.flashcards, flashcard] 
  })),
  removeFlashcard: (id) => set((state) => ({
    flashcards: state.flashcards.filter(fc => fc.id !== id)
  })),
  
  // UI state actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

// Helper function to create a new canvas item
export const createCanvasItem = (
  workspaceId: string,
  type: CanvasItemType,
  position: Position = { x: 100, y: 100 },
  size: Size = { w: 400, h: 300 },
  content: Record<string, unknown> = {}
): CanvasItem => {
  return {
    id: crypto.randomUUID(),
    workspace_id: workspaceId,
    type,
    content,
    position,
    size,
  };
};
