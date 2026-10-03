// Supabase API Service - All database operations go through Supabase
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { designs as localDesigns, collections as localCollections } from '../data';

// ============ DESIGNS ============
export const designsApi = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      return { success: true, data: localDesigns };
    }
    const { data, error } = await supabase
      .from('designs')
      .select('*, design_images(*)')
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    // Transform images to match frontend format
    const transformed = data.map((d: any) => ({
      ...d,
      collectionId: d.collection_id,
      priceType: d.price_type,
      longDescription: d.long_description,
      images: (d.design_images || []).map((img: any) => ({
        id: img.id,
        url: img.image_url,
        alt: img.alt_text,
        isPrimary: img.is_primary,
      })).sort((a: any, b: any) => a.sort_order - b.sort_order),
    }));
    return { success: true, data: transformed };
  },

  async getBySlug(slug: string) {
    if (!isSupabaseConfigured()) {
      const design = localDesigns.find((d) => d.slug === slug);
      return design ? { success: true, data: design } : { success: false, error: 'Not found' };
    }
    const { data, error } = await supabase
      .from('designs')
      .select('*, design_images(*)')
      .eq('slug', slug)
      .single();
    if (error) return { success: false, error: error.message };
    return {
      success: true,
      data: {
        ...data,
        collectionId: data.collection_id,
        priceType: data.price_type,
        longDescription: data.long_description,
        images: (data.design_images || []).map((img: any) => ({
          id: img.id,
          url: img.image_url,
          alt: img.alt_text,
          isPrimary: img.is_primary,
        })).sort((a: any, b: any) => a.sort_order - b.sort_order),
      },
    };
  },

  async create(design: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { images, ...designData } = design;
    const { data, error } = await supabase
      .from('designs')
      .insert({
        name: designData.name,
        slug: designData.slug,
        description: designData.description,
        long_description: designData.longDescription || null,
        collection_id: designData.collectionId || null,
        category: designData.category,
        price: designData.price || null,
        price_type: designData.priceType || 'starting',
        availability: designData.availability || 'made-to-order',
        customizable: designData.customizable ?? true,
        featured: designData.featured ?? false,
        material: designData.material || null,
        craft: designData.craft || null,
        occasion: designData.occasion || null,
        care: designData.care || null,
        tags: designData.tags || [],
      })
      .select()
      .single();
    if (error) return { success: false, error: error.message };

    // Insert images
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await supabase.from('design_images').insert({
          design_id: data.id,
          image_url: images[i].url,
          alt_text: images[i].alt || '',
          sort_order: i,
          is_primary: images[i].isPrimary || i === 0,
        });
      }
    }
    return { success: true, data };
  },

  async update(id: string, design: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { images, ...designData } = design;
    const { data, error } = await supabase
      .from('designs')
      .update({
        name: designData.name,
        slug: designData.slug,
        description: designData.description,
        long_description: designData.longDescription || null,
        collection_id: designData.collectionId || null,
        category: designData.category,
        price: designData.price || null,
        price_type: designData.priceType || 'starting',
        availability: designData.availability || 'made-to-order',
        customizable: designData.customizable ?? true,
        featured: designData.featured ?? false,
        material: designData.material || null,
        craft: designData.craft || null,
        occasion: designData.occasion || null,
        care: designData.care || null,
        tags: designData.tags || [],
      })
      .eq('id', id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };

    // Update images
    if (images !== undefined) {
      await supabase.from('design_images').delete().eq('design_id', id);
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await supabase.from('design_images').insert({
            design_id: id,
            image_url: images[i].url,
            alt_text: images[i].alt || '',
            sort_order: i,
            is_primary: images[i].isPrimary || i === 0,
          });
        }
      }
    }
    return { success: true, data };
  },

  async delete(id: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase.from('designs').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};

// ============ COLLECTIONS ============
export const collectionsApi = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      return { success: true, data: localCollections };
    }
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('sort_order');
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async create(col: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('collections')
      .insert({
        name: col.name,
        slug: col.slug,
        description: col.description || '',
        cover_image: col.coverImage || null,
        featured: col.featured ?? false,
        sort_order: col.sortOrder || 0,
      })
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async update(id: string, col: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('collections')
      .update({
        name: col.name,
        slug: col.slug,
        description: col.description || '',
        cover_image: col.coverImage || null,
        featured: col.featured ?? false,
        sort_order: col.sortOrder || 0,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async delete(id: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};

// ============ BOOKINGS ============
export const bookingsApi = {
  async getAll() {
    if (!isSupabaseConfigured()) return { success: true, data: [] };
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async create(booking: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        customer_name: booking.customerName,
        email: booking.email,
        phone: booking.phone,
        design_id: booking.designId || null,
        design_name: booking.designName || null,
        collection: booking.collection || null,
        occasion: booking.occasion || null,
        requested_date: booking.requestedDate || null,
        quantity: parseInt(booking.quantity) || 1,
        customization: booking.customization || 'no',
        color_preference: booking.colorPreference || null,
        size_details: booking.sizeDetails || null,
        notes: booking.notes || null,
        status: 'NEW',
      })
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async updateStatus(id: string, status: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async delete(id: string) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};

// ============ CONTACT MESSAGES ============
export const contactApi = {
  async getAll() {
    if (!isSupabaseConfigured()) return { success: true, data: [] };
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  async create(msg: any) {
    if (!isSupabaseConfigured()) return { success: false, error: 'Not configured' };
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: msg.name,
        email: msg.email,
        subject: msg.subject || null,
        message: msg.message,
      })
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },
};

// ============ IMAGE UPLOAD (Supabase Storage) ============
export const uploadApi = {
  async uploadImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true, url: URL.createObjectURL(file) };
    }
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('designs')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) return { success: false, error: error.message };
    const { data: urlData } = supabase.storage.from('designs').getPublicUrl(data.path);
    return { success: true, url: urlData.publicUrl };
  },

  async uploadMultiple(files: FileList): Promise<{ success: boolean; urls: string[]; error?: string }> {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const result = await uploadApi.uploadImage(file);
      if (result.success && result.url) {
        urls.push(result.url);
      } else {
        return { success: false, urls, error: result.error };
      }
    }
    return { success: true, urls };
  },
};
