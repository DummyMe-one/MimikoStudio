import { useState, useEffect } from 'react';
import { Save, RotateCcw, Check } from 'lucide-react';
import { appearanceApi } from '../../services/cmsApi';
import { useTheme } from '../../contexts/ThemeContext';

const FONT_OPTIONS = {
  heading: ['Cormorant Garamond', 'Playfair Display', 'DM Serif Display', 'Libre Baskerville', 'Lora'],
  body: ['Inter', 'Manrope', 'Montserrat', 'Lato', 'Poppins'],
};

const PRESETS = [
  { id: 'champagne-luxury', name: 'Champagne Luxury', desc: 'Ivory + Gold + Espresso' },
  { id: 'midnight-gold', name: 'Midnight Gold', desc: 'Deep Espresso + Gold + Cream' },
  { id: 'soft-artisan', name: 'Soft Artisan', desc: 'Warm Beige + Brown + Muted Gold' },
  { id: 'festive-navratri', name: 'Festive Navratri', desc: 'Deep warm tones + Gold' },
  { id: 'minimal-editorial', name: 'Minimal Editorial', desc: 'White + Charcoal + Champagne' },
];

export default function AppearanceStudio() {
  const { theme, setTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setLocalTheme(theme); }, [theme]);

  const updateField = (key: string, value: any) => {
    setLocalTheme(prev => ({ ...prev, [key]: value }));
    setTheme({ [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await appearanceApi.update(localTheme);
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      alert(res.error || 'Failed to save');
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset all appearance settings to defaults?')) return;
    const res = await appearanceApi.reset();
    if (res.success && res.data) {
      setLocalTheme(res.data);
      setTheme(res.data);
    }
  };

  const applyPreset = async (presetId: string) => {
    const res = await appearanceApi.applyPreset(presetId);
    if (res.success && res.data) {
      setLocalTheme(prev => ({ ...prev, ...res.data }));
      setTheme(res.data);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-serif text-3xl font-semibold text-espresso">Appearance Studio</h1>
          <p className="text-taupe text-sm">Customize your site's visual identity</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="flex items-center gap-2 border border-champagne text-espresso px-4 py-2.5 text-sm hover:bg-cream transition-colors">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-espresso text-ivory px-5 py-2.5 text-sm font-medium hover:bg-espresso/90 transition-colors disabled:opacity-50">
            {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Presets */}
          <div className="bg-white border border-champagne/30 p-6">
            <h3 className="text-xs uppercase tracking-widest text-light-gold font-medium mb-4">Theme Presets</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRESETS.map(preset => (
                <button key={preset.id} onClick={() => applyPreset(preset.id)} className="p-3 border border-champagne/50 hover:border-light-gold transition-colors text-left">
                  <p className="text-sm font-medium text-espresso">{preset.name}</p>
                  <p className="text-xs text-taupe">{preset.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white border border-champagne/30 p-6">
            <h3 className="text-xs uppercase tracking-widest text-light-gold font-medium mb-4">Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { key: 'primary_color', label: 'Primary' },
                { key: 'secondary_color', label: 'Secondary' },
                { key: 'accent_color', label: 'Accent' },
                { key: 'background_color', label: 'Background' },
                { key: 'surface_color', label: 'Surface' },
                { key: 'dark_background', label: 'Dark BG' },
                { key: 'text_color', label: 'Text' },
                { key: 'muted_text_color', label: 'Muted Text' },
                { key: 'border_color', label: 'Border' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs text-taupe mb-1.5">{field.label}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={(localTheme as any)[field.key]} onChange={e => updateField(field.key, e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-champagne" />
                    <input type="text" value={(localTheme as any)[field.key]} onChange={e => updateField(field.key, e.target.value)} className="flex-1 border border-champagne bg-ivory px-2 py-1.5 text-xs rounded font-mono" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white border border-champagne/30 p-6">
            <h3 className="text-xs uppercase tracking-widest text-light-gold font-medium mb-4">Typography</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-taupe mb-1.5">Heading Font</label>
                <select value={localTheme.heading_font} onChange={e => updateField('heading_font', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  {FONT_OPTIONS.heading.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Body Font</label>
                <select value={localTheme.body_font} onChange={e => updateField('body_font', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  {FONT_OPTIONS.body.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Heading Weight</label>
                <select value={localTheme.heading_weight} onChange={e => updateField('heading_weight', parseInt(e.target.value))} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  <option value={300}>Light (300)</option>
                  <option value={400}>Regular (400)</option>
                  <option value={500}>Medium (500)</option>
                  <option value={600}>Semibold (600)</option>
                  <option value={700}>Bold (700)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Heading Size</label>
                <select value={localTheme.heading_size_multiplier} onChange={e => updateField('heading_size_multiplier', parseFloat(e.target.value))} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  <option value={0.9}>Small (0.9x)</option>
                  <option value={1.0}>Normal (1x)</option>
                  <option value={1.1}>Large (1.1x)</option>
                  <option value={1.2}>Extra Large (1.2x)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shapes */}
          <div className="bg-white border border-champagne/30 p-6">
            <h3 className="text-xs uppercase tracking-widest text-light-gold font-medium mb-4">Shapes & Effects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-taupe mb-1.5">Card Radius: {localTheme.card_radius}px</label>
                <input type="range" min="0" max="32" value={localTheme.card_radius} onChange={e => updateField('card_radius', parseInt(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Button Radius: {localTheme.button_radius}px</label>
                <input type="range" min="0" max="999" value={localTheme.button_radius} onChange={e => updateField('button_radius', parseInt(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Image Style</label>
                <select value={localTheme.image_style} onChange={e => updateField('image_style', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  <option value="sharp">Sharp (0px)</option>
                  <option value="rounded">Rounded</option>
                  <option value="organic">Organic</option>
                  <option value="capsule">Capsule</option>
                  <option value="arch">Arch</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Shadow Intensity</label>
                <select value={localTheme.shadow_intensity} onChange={e => updateField('shadow_intensity', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  <option value="none">None</option>
                  <option value="subtle">Subtle</option>
                  <option value="medium">Medium</option>
                  <option value="strong">Strong</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-taupe mb-1.5">Section Spacing</label>
                <select value={localTheme.section_spacing} onChange={e => updateField('section_spacing', e.target.value)} className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded">
                  <option value="compact">Compact</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xs uppercase tracking-widest text-light-gold font-medium mb-4">Live Preview</h3>
            <div className="border border-champagne/30 overflow-hidden" style={{ borderRadius: 'var(--radius-md)' }}>
              {/* Mini preview */}
              <div style={{ backgroundColor: localTheme.background_color, padding: '20px' }}>
                <p style={{ color: localTheme.primary_color, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>MIMIKO ATELIER</p>
                <h4 style={{ fontFamily: localTheme.heading_font + ', serif', color: localTheme.text_color, fontSize: '20px', fontWeight: localTheme.heading_weight, marginBottom: '8px', lineHeight: 1.1 }}>
                  Crafted to Adorn
                </h4>
                <p style={{ color: localTheme.muted_text_color, fontSize: '10px', marginBottom: '12px' }}>Discover handcrafted jewellery</p>
                <button style={{ backgroundColor: localTheme.dark_background, color: localTheme.background_color, padding: '6px 12px', fontSize: '9px', borderRadius: localTheme.button_radius + 'px', border: 'none' }}>
                  Explore
                </button>
              </div>
              <div style={{ backgroundColor: localTheme.dark_background, padding: '16px' }}>
                <p style={{ color: localTheme.primary_color, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Dark Section</p>
                <h4 style={{ fontFamily: localTheme.heading_font + ', serif', color: '#FFFFFF', fontSize: '16px', fontWeight: localTheme.heading_weight }}>The Art of Adornment</h4>
              </div>
              <div style={{ backgroundColor: localTheme.surface_color, padding: '16px', display: 'flex', gap: '8px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ flex: 1, aspectRatio: '1', backgroundColor: localTheme.secondary_color, borderRadius: localTheme.image_style === 'capsule' ? '999px' : localTheme.card_radius + 'px' }} />
                ))}
              </div>
            </div>
            <p className="text-xs text-taupe mt-3 text-center">Preview updates in real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
