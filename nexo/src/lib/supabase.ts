import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const authOperations = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getSession: async () => {
    return await supabase.auth.getSession();
  },
  
  getUser: async () => {
    return await supabase.auth.getUser();
  },
};

export const workspaceOperations = {
  getAll: async (userId: string) => {
    return await supabase
      .from('workspaces')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
  },
  
  getById: async (id: string) => {
    return await supabase
      .from('workspaces')
      .select('*')
      .eq('id', id)
      .single();
  },
  
  create: async (workspace: { user_id: string; title: string; layout_config?: unknown }) => {
    return await supabase
      .from('workspaces')
      .insert([workspace])
      .select()
      .single();
  },
  
  update: async (id: string, updates: Partial<{ title: string; layout_config: unknown }>) => {
    return await supabase
      .from('workspaces')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },
  
  delete: async (id: string) => {
    return await supabase
      .from('workspaces')
      .delete()
      .eq('id', id);
  },
};

export const canvasItemOperations = {
  getAll: async (workspaceId: string) => {
    return await supabase
      .from('canvas_items')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: true });
  },
  
  create: async (item: { 
    workspace_id: string; 
    type: string; 
    content: unknown; 
    position: { x: number; y: number };
    size: { w: number; h: number };
  }) => {
    return await supabase
      .from('canvas_items')
      .insert([item])
      .select()
      .single();
  },
  
  update: async (id: string, updates: Partial<{ 
    content: unknown; 
    position: { x: number; y: number };
    size: { w: number; h: number };
  }>) => {
    return await supabase
      .from('canvas_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },
  
  delete: async (id: string) => {
    return await supabase
      .from('canvas_items')
      .delete()
      .eq('id', id);
  },
};

export const conversationOperations = {
  getByWorkspace: async (workspaceId: string) => {
    return await supabase
      .from('ai_conversations')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('updated_at', { ascending: false });
  },
  
  create: async (conversation: { 
    workspace_id: string; 
    messages?: unknown[]; 
    context_data?: unknown;
  }) => {
    return await supabase
      .from('ai_conversations')
      .insert([conversation])
      .select()
      .single();
  },
  
  update: async (id: string, updates: Partial<{ 
    messages: unknown[]; 
    context_data: unknown;
  }>) => {
    return await supabase
      .from('ai_conversations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },
};

export const documentOperations = {
  getAll: async (userId: string) => {
    return await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },
  
  upload: async (document: { 
    user_id: string; 
    type: string; 
    url: string; 
    metadata: unknown;
  }) => {
    return await supabase
      .from('documents')
      .insert([document])
      .select()
      .single();
  },
  
  delete: async (id: string) => {
    return await supabase
      .from('documents')
      .delete()
      .eq('id', id);
  },
};

export const flashcardOperations = {
  getAll: async (userId: string) => {
    return await supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },
  
  create: async (flashcard: { 
    user_id: string; 
    source_content: string; 
    question: string; 
    answer: string;
  }) => {
    return await supabase
      .from('flashcards')
      .insert([flashcard])
      .select()
      .single();
  },
  
  delete: async (id: string) => {
    return await supabase
      .from('flashcards')
      .delete()
      .eq('id', id);
  },
};
