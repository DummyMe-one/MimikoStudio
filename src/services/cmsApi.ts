// CMS API Service - Visual CMS operations
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ============ APPEARANCE SETTINGS ============
export const appearanceApi = {
  async get() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('appearance_settings')
      .select('*')
      .eq('is_active', true)
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async update(settings: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('appearance_settings')
      .update(settings)
      .eq('is_active', true)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async reset() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    // Reset to default values
    const defaults = {
      primary_color: '#C6A15B',
      secondary_color: '#EFE6D6',
      accent_color: '#C6A15B',
      background_color: '#F8F4EC',
      surface_color: '#FFFFFF',
      dark_background: '#241C17',
      text_color: '#302821',
      muted_text_color: '#75695C',
      border_color: '#E8D5B5',
      heading_font: 'Cormorant Garamond',
      body_font: 'Inter',
      heading_weight: 600,
      body_weight: 400,
      heading_size_multiplier: 1.0,
      border_radius: 4,
      card_radius: 8,
      button_radius: 4,
      image_style: 'rounded',
      shadow_intensity: 'subtle',
      animation_intensity: 'elegant',
      section_spacing: 'comfortable',
      header_style: 'luxury',
      header_transparent: false,
    };
    return this.update(defaults);
  },

  async applyPreset(preset: string) {
    const presets: Record<string, any> = {
      'champagne-luxury': {
        primary_color: '#C6A15B',
        secondary_color: '#EFE6D6',
        accent_color: '#C6A15B',
        background_color: '#F8F4EC',
        surface_color: '#FFFFFF',
        dark_background: '#241C17',
        text_color: '#302821',
        muted_text_color: '#75695C',
        border_color: '#E8D5B5',
      },
      'midnight-gold': {
        primary_color: '#C6A15B',
        secondary_color: '#3A2D24',
        accent_color: '#D4AF37',
        background_color: '#241C17',
        surface_color: '#2C2219',
        dark_background: '#1A130E',
        text_color: '#F8F4EC',
        muted_text_color: '#B9A88C',
        border_color: '#3A2D24',
      },
      'soft-artisan': {
        primary_color: '#B9975B',
        secondary_color: '#DCCDB8',
        accent_color: '#8B7355',
        background_color: '#F5EFE3',
        surface_color: '#FFFFFF',
        dark_background: '#3A2D24',
        text_color: '#302821',
        muted_text_color: '#8B7A68',
        border_color: '#DCCDB8',
      },
      'festive-navratri': {
        primary_color: '#D4AF37',
        secondary_color: '#8B1A1A',
        accent_color: '#FFD700',
        background_color: '#F8F4EC',
        surface_color: '#FFFFFF',
        dark_background: '#4A0E0E',
        text_color: '#302821',
        muted_text_color: '#75695C',
        border_color: '#D4AF37',
      },
      'minimal-editorial': {
        primary_color: '#333333',
        secondary_color: '#F5F5F5',
        accent_color: '#C6A15B',
        background_color: '#FFFFFF',
        surface_color: '#FAFAFA',
        dark_background: '#1A1A1A',
        text_color: '#1A1A1A',
        muted_text_color: '#888888',
        border_color: '#E5E5E5',
      },
    };

    const presetData = presets[preset];
    if (!presetData) return { success: false, error: 'Unknown preset' };
    return this.update(presetData);
  },
};

// ============ MEDIA ASSETS ============
export const mediaApi = {
  async getAll() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  },

  async create(asset: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('media_assets')
      .insert(asset)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async delete(id: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase.from('media_assets').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },

  async uploadFile(file: File): Promise<{ success: boolean; url?: string; storageKey?: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true, url: URL.createObjectURL(file) };
    }
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) return { success: false, error: error.message };
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
    return { success: true, url: urlData.publicUrl, storageKey: data.path };
  },
};

// ============ HOMEPAGE ============
export const homepageApi = {
  async getActive() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('homepages')
      .select('*')
      .eq('status', 'published')
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async getSections(homepageId: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .eq('homepage_id', homepageId)
      .order('sort_order');
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  },

  async getAllSections() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    // Get sections for the default homepage
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .order('sort_order');
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  },

  async createSection(section: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('homepage_sections')
      .insert(section)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async updateSection(id: string, updates: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('homepage_sections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async deleteSection(id: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase.from('homepage_sections').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },

  async reorderSections(sectionIds: string[]) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    for (let i = 0; i < sectionIds.length; i++) {
      await supabase
        .from('homepage_sections')
        .update({ sort_order: i + 1 })
        .eq('id', sectionIds[i]);
    }
    return { success: true };
  },

  async publish() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase
      .from('homepages')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('status', 'draft');
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};

// ============ SITE SETTINGS ============
export const siteSettingsApi = {
  async getAll() {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) return { success: false, error: error.message };
    const settings: Record<string, string> = {};
    (data || []).forEach((s: any) => { settings[s.key] = s.value; });
    return { success: true, data: settings };
  },

  async update(key: string, value: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value })
      .eq('key', key);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};
