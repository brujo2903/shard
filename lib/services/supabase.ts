import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../config/supabase';
import { Agent, CreateAgentDTO } from '../types/agent';

const supabase = createClient(
  SUPABASE_CONFIG.projectUrl,
  SUPABASE_CONFIG.anonKey
);

export class SupabaseService {
  static async createAgent(agentData: CreateAgentDTO): Promise<Agent> {
    const userId = await this.getCurrentUserId();
    
    const { data, error } = await supabase
      .from('agents')
      .insert([{ ...agentData, userId }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async uploadAgentImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `agent-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('agent-assets')
      .upload(filePath, file);

    if (uploadError) throw new Error(uploadError.message);

    const { data: { publicUrl } } = supabase.storage
      .from('agent-assets')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  static async getAgents(): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  private static async getCurrentUserId(): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user found');
    return user.id;
  }
}