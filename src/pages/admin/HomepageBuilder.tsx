import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, X, Check } from 'lucide-react';
import { homepageApi } from '../../services/cmsApi';

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero', icon: '🖼️' },
  { type: 'collection_grid', label: 'Collection Grid', icon: '📦' },
  { type: 'featured_designs', label: 'Featured Designs', icon: '✨' },
  { type: 'split_content', label: 'Split Content', icon: '📐' },
  { type: 'dark_showcase', label: 'Dark Showcase', icon: '🌙' },
  { type: 'cta', label: 'Call to Action', icon: '🎯' },
  { type: 'gallery', label: 'Gallery', icon: '🖼️' },
  { type: 'booking_cta', label: 'Booking CTA', icon: '📅' },
];

const DEFAULT_CONFIGS: Record<string, any> = {
  hero: { label: 'MIMIKO ATELIER', heading: 'Your Heading Here', description: 'Your description here.', primaryButton: { text: 'Explore', link: '/collections' }, secondaryButton: { text: 'Book', link: '/booking' }, image: { sourceType: 'URL', url: '', alt: '' }, style: 'editorial', height: 'full' },
  collection_grid: { label: 'Curated Collections', heading: 'Discover Our World', layout: 'editorial' },
  featured_designs: { label: 'Featured Pieces', heading: 'Signature Designs', count: 6 },
  split_content: { label: 'Section Label', heading: 'Your Heading', description: 'Your description here.', image: { sourceType: 'URL', url: '', alt: '' }, primaryButton: { text: 'Learn More', link: '/' }, imagePosition: 'left', theme: 'light' },
  dark_showcase: { label: 'Showcase', heading: 'The Art of Adornment', description: 'Your description.', backgroundImage: { sourceType: 'URL', url: '' } },
  cta: { heading: 'Made Especially for You', description: 'Your description.', button: { text: 'Request Design', link: '/custom-design' }, backgroundImage: { sourceType: 'URL', url: '' } },
  gallery: { label: 'Our Creations', heading: 'Visual Journey', count: 8 },
  booking_cta: { heading: 'Find Something You Love?', description: 'Browse our collections and book your favourite design.', primaryButton: { text: 'Explore', link: '/collections' }, secondaryButton: { text: 'Book', link: '/booking' } },
};

export default function HomepageBuilder() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editConfig, setEditConfig] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => { loadSections(); }, []);

  const loadSections = async () => {
    const res = await homepageApi.getAllSections();
    if (res.success) setSections(res.data || []);
    setLoading(false);
  };

  const addSection = async (type: string) => {
    const newSection = {
      homepage_id: '00000000-0000-0000-0000-000000000002',
      type,
      enabled: true,
      sort_order: sections.length + 1,
      theme: type === 'dark_showcase' || type === 'cta' ? 'dark' : 'light',
      config: DEFAULT_CONFIGS[type] || {},
    };
    const res = await homepageApi.createSection(newSection);
    if (res.success) {
      await loadSections();
      setShowAddMenu(false);
    }
  };

  const deleteSection = async (id: string) => {
    if (!confirm('Delete this section?')) return;
    await homepageApi.deleteSection(id);
    await loadSections();
  };

  const toggleEnabled = async (section: any) => {
    await homepageApi.updateSection(section.id, { enabled: !section.enabled });
    await loadSections();
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const newOrder = [...sections];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    const ids = newOrder.map(s => s.id);
    await homepageApi.reorderSections(ids);
    await loadSections();
  };

  const startEdit = (section: any) => {
    setEditingId(section.id);
    setEditConfig(JSON.parse(JSON.stringify(section.config || {})));
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    await homepageApi.updateSection(editingId, { config: editConfig });
    setSaving(false);
    setEditingId(null);
    await loadSections();
  };

  const updateConfigField = (path: string, value: any) => {
    const newConfig = { ...editConfig };
    const keys = path.split('.');
    let obj: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setEditConfig(newConfig);
  };

  if (loading) return <div className="py-20 text-center text-taupe">Loading homepage sections...</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-serif text-3xl font-semibold text-espresso">Homepage Builder</h1>
          <p className="text-taupe text-sm">Arrange and configure your homepage sections</p>
        </div>
        <div className="relative">
          <button onClick={() => setShowAddMenu(!showAddMenu)} className="flex items-center gap-2 bg-espresso text-ivory px-4 py-2.5 text-sm font-medium hover:bg-espresso/90 transition-colors">
            <Plus size={16} /> Add Section
          </button>
          {showAddMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-champagne shadow-lg z-10 py-2" style={{ borderRadius: 'var(--radius-md)' }}>
              {SECTION_TYPES.map(st => (
                <button key={st.type} onClick={() => addSection(st.type)} className="w-full text-left px-4 py-2.5 hover:bg-cream transition-colors flex items-center gap-3">
                  <span>{st.icon}</span>
                  <span className="text-sm text-espresso">{st.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="bg-white border border-champagne/30 p-12 text-center">
          <p className="text-taupe mb-4">No sections yet. Add your first section to start building the homepage.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={section.id} className={"bg-white border transition-all " + (section.enabled ? 'border-champagne/30' : 'border-champagne/20 opacity-60')} style={{ borderRadius: 'var(--radius-md)' }}>
              {editingId === section.id ? (
                /* Edit Mode */
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-espresso">
                      Edit: {SECTION_TYPES.find(s => s.type === section.type)?.label || section.type}
                    </h3>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(null)} className="p-2 text-taupe hover:text-espresso"><X size={16} /></button>
                      <button onClick={saveEdit} disabled={saving} className="flex items-center gap-1 bg-espresso text-ivory px-3 py-1.5 text-xs hover:bg-espresso/90">
                        {saving ? 'Saving...' : <><Check size={12} /> Save</>}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {/* Common fields */}
                    {editConfig.label !== undefined && (
                      <div>
                        <label className="block text-xs text-taupe mb-1">Label</label>
                        <input type="text" value={editConfig.label || ''} onChange={e => updateConfigField('label', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                      </div>
                    )}
                    {editConfig.heading !== undefined && (
                      <div>
                        <label className="block text-xs text-taupe mb-1">Heading</label>
                        <input type="text" value={editConfig.heading || ''} onChange={e => updateConfigField('heading', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                      </div>
                    )}
                    {editConfig.subheading !== undefined && (
                      <div>
                        <label className="block text-xs text-taupe mb-1">Subheading</label>
                        <input type="text" value={editConfig.subheading || ''} onChange={e => updateConfigField('subheading', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                      </div>
                    )}
                    {editConfig.description !== undefined && (
                      <div>
                        <label className="block text-xs text-taupe mb-1">Description</label>
                        <textarea value={editConfig.description || ''} onChange={e => updateConfigField('description', e.target.value)} rows={2} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded resize-none" />
                      </div>
                    )}
                    
                    {/* Image */}
                    {editConfig.image !== undefined && (
                      <div>
                        <label className="block text-xs text-taupe mb-1">Image URL</label>
                        <input type="url" value={editConfig.image?.url || ''} onChange={e => updateConfigField('image.url', e.target.value)} placeholder="https://..." className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        {editConfig.image?.url && (
                          <img src={editConfig.image.url} alt="" className="mt-2 w-32 h-20 object-cover rounded" />
                        )}
                      </div>
                    )}
                    {editConfig.backgroundImage !== undefined && (
                      <div>
                        <label className="block text-xs text-taupe mb-1">Background Image URL</label>
                        <input type="url" value={editConfig.backgroundImage?.url || ''} onChange={e => updateConfigField('backgroundImage.url', e.target.value)} placeholder="https://..." className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                      </div>
                    )}

                    {/* Buttons */}
                    {editConfig.primaryButton !== undefined && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-taupe mb-1">Primary Button Text</label>
                          <input type="text" value={editConfig.primaryButton?.text || ''} onChange={e => updateConfigField('primaryButton.text', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        </div>
                        <div>
                          <label className="block text-xs text-taupe mb-1">Primary Button Link</label>
                          <input type="text" value={editConfig.primaryButton?.link || ''} onChange={e => updateConfigField('primaryButton.link', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        </div>
                      </div>
                    )}
                    {editConfig.secondaryButton !== undefined && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-taupe mb-1">Secondary Button Text</label>
                          <input type="text" value={editConfig.secondaryButton?.text || ''} onChange={e => updateConfigField('secondaryButton.text', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        </div>
                        <div>
                          <label className="block text-xs text-taupe mb-1">Secondary Button Link</label>
                          <input type="text" value={editConfig.secondaryButton?.link || ''} onChange={e => updateConfigField('secondaryButton.link', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        </div>
                      </div>
                    )}
                    {editConfig.button !== undefined && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-taupe mb-1">Button Text</label>
                          <input type="text" value={editConfig.button?.text || ''} onChange={e => updateConfigField('button.text', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        </div>
                        <div>
                          <label className="block text-xs text-taupe mb-1">Button Link</label>
                          <input type="text" value={editConfig.button?.link || ''} onChange={e => updateConfigField('button.link', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
                        </div>
                      </div>
                    )}

                    {/* Theme */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-taupe mb-1">Section Theme</label>
                        <select value={section.theme} onChange={async e => { await homepageApi.updateSection(section.id, { theme: e.target.value }); await loadSections(); }} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </select>
                      </div>
                      {editConfig.imagePosition !== undefined && (
                        <div>
                          <label className="block text-xs text-taupe mb-1">Image Position</label>
                          <select value={editConfig.imagePosition || 'left'} onChange={e => updateConfigField('imagePosition', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                            <option value="left">Image Left</option>
                            <option value="right">Image Right</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-center gap-4 p-4">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 text-taupe hover:text-espresso disabled:opacity-30"><ChevronUp size={14} /></button>
                    <button onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className="p-1 text-taupe hover:text-espresso disabled:opacity-30"><ChevronDown size={14} /></button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{SECTION_TYPES.find(s => s.type === section.type)?.icon}</span>
                      <h3 className="text-sm font-medium text-espresso truncate">
                        {SECTION_TYPES.find(s => s.type === section.type)?.label || section.type}
                      </h3>
                      <span className={"text-[10px] px-2 py-0.5 rounded-full " + (section.theme === 'dark' ? 'bg-espresso/10 text-espresso' : 'bg-cream text-taupe')}>
                        {section.theme}
                      </span>
                    </div>
                    <p className="text-xs text-taupe truncate mt-0.5">
                      {section.config?.heading || section.config?.label || 'No heading set'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleEnabled(section)} className="p-2 text-taupe hover:text-espresso transition-colors" title={section.enabled ? 'Hide' : 'Show'}>
                      {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => startEdit(section)} className="p-2 text-taupe hover:text-espresso transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteSection(section.id)} className="p-2 text-taupe hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
