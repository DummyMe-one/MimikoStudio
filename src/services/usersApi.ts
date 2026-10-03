import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Permission, Role } from '../lib/permissions';
import { ROLE_PERMISSIONS } from '../lib/permissions';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: Role | null;
  permissions: Permission[];
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED' | 'DISABLED';
}

export const usersApi = {
  // Get current user profile with permissions
  async getCurrentUserProfile(): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    try {
      // Get current auth user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      // Get user profile from users table
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select(`
          id,
          email,
          name,
          status,
          roles(id, name)
        `)
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        // User doesn't exist in users table yet - create with default role
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            status: 'ACTIVE',
          });

        if (insertError) {
          return { success: false, error: insertError.message };
        }

        // Return default permissions (viewer)
        return {
          success: true,
          data: {
            id: user.id,
            email: user.email || '',
            name: null,
            role: 'SUPPORT_VIEWER',
            permissions: ROLE_PERMISSIONS.SUPPORT_VIEWER,
            status: 'ACTIVE',
          },
        };
      }

      const role = profile.roles?.[0]?.name as Role || 'SUPPORT_VIEWER';
      const permissions = ROLE_PERMISSIONS[role] || [];

      return {
        success: true,
        data: {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role,
          permissions,
          status: profile.status as any,
        },
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Get all users (admin only)
  async getAllUsers(): Promise<{ success: boolean; data?: any[]; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        status,
        last_login,
        created_at,
        roles(id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  },

  // Update user role
  async updateUserRole(userId: string, roleId: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { error } = await supabase
      .from('users')
      .update({ role_id: roleId })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Update user status
  async updateUserStatus(userId: string, status: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { error } = await supabase
      .from('users')
      .update({ status })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Get all roles
  async getRoles(): Promise<{ success: boolean; data?: any[]; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('name');

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  },

  // Log audit event
  async logAuditEvent(
    action: string,
    module: string,
    objectType?: string,
    objectId?: string,
    details?: any
  ): Promise<void> {
    if (!isSupabaseConfigured()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('audit_logs').insert({
        user_id: user.id,
        user_email: user.email,
        action,
        module,
        object_type: objectType,
        object_id: objectId,
        details,
      });
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  },

  // Get audit logs
  async getAuditLogs(limit: number = 100): Promise<{ success: boolean; data?: any[]; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  },
};
