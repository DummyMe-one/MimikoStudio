import { useState } from 'react';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import { Save, Upload, Link as LinkIcon } from 'lucide-react';

export default function SiteSettingsManager() {
  const { settings, updateSettings } = useSiteSettings();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'logoDarkUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, convert to base64 and store in localStorage
    // In production, you'd upload to Supabase Storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      handleChange(field, base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="heading-serif text-3xl font-semibold text-espresso mb-2">Site Settings</h1>
        <p className="text-taupe">Manage your website's branding and contact information</p>
      </div>

      <div className="space-y-6">
        {/* Branding Section */}
        <div className="bg-white border border-champagne/30 p-6">
          <h2 className="text-lg font-semibold text-espresso mb-4">Branding</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Site Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Site Tagline</label>
              <input
                type="text"
                value={formData.siteTagline}
                onChange={(e) => handleChange('siteTagline', e.target.value)}
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Logo (Light Background)</label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-2 border border-champagne rounded-lg hover:bg-cream transition-colors">
                        <Upload size={16} />
                        <span className="text-sm">Upload Logo</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, 'logoUrl')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.logoUrl.startsWith('data:') ? '' : formData.logoUrl}
                    onChange={(e) => handleChange('logoUrl', e.target.value)}
                    placeholder="Or paste image URL"
                    className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
                  />
                </div>
                {formData.logoUrl && (
                  <div className="w-32 h-32 border border-champagne rounded-lg overflow-hidden bg-cream flex items-center justify-center">
                    <img src={formData.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Logo (Dark Background)</label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-2 border border-champagne rounded-lg hover:bg-cream transition-colors">
                        <Upload size={16} />
                        <span className="text-sm">Upload Dark Logo</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, 'logoDarkUrl')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.logoDarkUrl.startsWith('data:') ? '' : formData.logoDarkUrl}
                    onChange={(e) => handleChange('logoDarkUrl', e.target.value)}
                    placeholder="Or paste image URL"
                    className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
                  />
                </div>
                {formData.logoDarkUrl && (
                  <div className="w-32 h-32 border border-champagne rounded-lg overflow-hidden bg-espresso flex items-center justify-center">
                    <img src={formData.logoDarkUrl} alt="Dark Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-champagne/30 p-6">
          <h2 className="text-lg font-semibold text-espresso mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">WhatsApp</label>
              <input
                type="tel"
                value={formData.contactWhatsapp}
                onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white border border-champagne/30 p-6">
          <h2 className="text-lg font-semibold text-espresso mb-4">Social Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Instagram</label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/username"
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Facebook</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/page"
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">YouTube</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/channel"
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Pinterest</label>
              <input
                type="url"
                value={formData.pinterestUrl}
                onChange={(e) => handleChange('pinterestUrl', e.target.value)}
                placeholder="https://pinterest.com/username"
                className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:border-light-gold"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-espresso text-ivory rounded-lg hover:bg-espresso/90 transition-colors disabled:opacity-50"
          >
            {saved ? (
              <>
                <Save size={18} />
                Saved!
              </>
            ) : (
              <>
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
