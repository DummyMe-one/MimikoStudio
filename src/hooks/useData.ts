import { useState, useEffect } from 'react';
import { designsApi, collectionsApi } from '../services/api';
import { designs as localDesigns, collections as localCollections } from '../data';
import type { Design, Collection } from '../data';

// Hook to fetch designs from Supabase (with local fallback)
export function useDesigns() {
  const [designs, setDesigns] = useState<Design[]>(localDesigns);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchDesigns = async () => {
      setLoading(true);
      const res = await designsApi.getAll();
      if (!cancelled) {
        if (res.success && res.data && res.data.length > 0) {
          setDesigns(res.data);
        } else {
          setDesigns(localDesigns);
        }
        setLoading(false);
      }
    };
    fetchDesigns();
    return () => { cancelled = true; };
  }, []);

  return { designs, loading };
}

// Hook to fetch collections from Supabase (with local fallback)
export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(localCollections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchCollections = async () => {
      setLoading(true);
      const res = await collectionsApi.getAll();
      if (!cancelled) {
        if (res.success && res.data && res.data.length > 0) {
          setCollections(res.data);
        } else {
          setCollections(localCollections);
        }
        setLoading(false);
      }
    };
    fetchCollections();
    return () => { cancelled = true; };
  }, []);

  return { collections, loading };
}

// Hook to fetch a single design by slug
export function useDesign(slug: string | undefined) {
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetchDesign = async () => {
      setLoading(true);
      setNotFound(false);
      // Try Supabase first
      const res = await designsApi.getBySlug(slug);
      if (!cancelled) {
        if (res.success && res.data) {
          setDesign(res.data);
        } else {
          // Fallback to local data
          const local = localDesigns.find((d) => d.slug === slug);
          if (local) {
            setDesign(local);
          } else {
            setNotFound(true);
          }
        }
        setLoading(false);
      }
    };
    fetchDesign();
    return () => { cancelled = true; };
  }, [slug]);

  return { design, loading, notFound };
}
