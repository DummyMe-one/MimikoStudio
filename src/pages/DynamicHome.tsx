import { useState, useEffect } from 'react';
import { homepageApi } from '../services/cmsApi';
import { SectionRenderer } from '../components/sections/HomepageSections';

interface DynamicHomeProps {
  onBookClick: () => void;
}

export default function DynamicHome({ onBookClick }: DynamicHomeProps) {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomepage = async () => {
      const res = await homepageApi.getAllSections();
      if (res.success && res.data) {
        // Only show enabled sections
        setSections(res.data.filter((s: any) => s.enabled));
      }
      setLoading(false);
    };
    loadHomepage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-muted)]">Loading homepage...</p>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Welcome to Mimiko Studio
          </h1>
          <p className="text-[var(--color-muted)] mb-6">
            Your homepage is being configured. Please check back soon or contact the administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
