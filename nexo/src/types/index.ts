// User types
export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  created_at: string;
}

// Workspace types
export interface Workspace {
  id: string;
  user_id: string;
  title: string;
  layout_config: LayoutConfig;
  created_at?: string;
  updated_at?: string;
}

export interface LayoutConfig {
  grid_size: number;
  snap_to_grid: boolean;
  show_grid: boolean;
  zoom_level: number;
}

// Canvas item types
export type CanvasItemType = 
  | 'note' 
  | 'pdf' 
  | 'video' 
  | 'image' 
  | 'diagram' 
  | 'calculator' 
  | 'ai_chat';

export interface CanvasItem {
  id: string;
  workspace_id: string;
  type: CanvasItemType;
  content: CanvasItemContent;
  position: Position;
  size: Size;
  created_at?: string;
  updated_at?: string;
}

export interface CanvasItemContent {
  text?: string;
  url?: string;
  data?: unknown;
  metadata?: Record<string, unknown>;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

// Document types
export type DocumentType = 'pdf' | 'image' | 'video' | 'audio' | 'link';

export interface Document {
  id: string;
  user_id: string;
  type: DocumentType;
  url: string;
  metadata: DocumentMetadata;
  created_at?: string;
}

export interface DocumentMetadata {
  name: string;
  size?: number;
  duration?: number;
  pages?: number;
}

// AI Conversation types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  workspace_id: string;
  messages: Message[];
  context_data?: ContextData;
  memory_profile?: MemoryProfile;
  created_at?: string;
  updated_at?: string;
}

export interface ContextData {
  active_canvas_items?: string[];
  current_topic?: string;
  learning_objectives?: string[];
}

export interface MemoryProfile {
  knowledge_graph?: KnowledgeNode[];
  weak_areas?: string[];
  strong_areas?: string[];
  learning_style?: string;
}

export interface KnowledgeNode {
  id: string;
  concept: string;
  connections: string[];
  mastery_level: number;
  last_reviewed?: string;
}

// Flashcard types
export interface Flashcard {
  id: string;
  user_id: string;
  source_content: string;
  question: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  next_review?: string;
  created_at?: string;
}

// Exam types
export interface ExamQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  question: string;
  options?: string[];
  correct_answer?: string | string[];
  points: number;
}

export interface Exam {
  id: string;
  user_id: string;
  topic: string;
  questions: ExamQuestion[];
  time_limit?: number;
  results?: ExamResult;
  created_at?: string;
  completed_at?: string;
}

export interface ExamResult {
  score: number;
  total_points: number;
  percentage: number;
  answers: Record<string, string>;
  feedback?: string;
}

// Tutor types
export interface TutorProfile {
  id: string;
  name: string;
  style: 'socratic' | 'direct' | 'encouraging' | 'analytical';
  subject_specialties?: string[];
  personality_traits?: string[];
}

// App state types
export interface AppState {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  canvasItems: CanvasItem[];
  documents: Document[];
  conversations: AIConversation[];
  flashcards: Flashcard[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}
