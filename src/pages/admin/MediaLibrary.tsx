import { useState, useEffect, useRef } from 'react';
import { Upload, Link as LinkIcon, Trash2, Copy, ExternalLink, Search } from 'lucide-react';
import { mediaApi } from '../../services/cmsApi';

export default function MediaLibrary() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [altInput, setAltInput] = useState('');
  const [search, setSearch] = useState('');
  const [showUrlForm, setShowUrlForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadAssets(); }, []);

  const loadAssets = async () => {
    const res = await mediaApi.getAll();
    if (res.success) setAssets(res.data || []);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const result = await mediaApi.uploadFile(file);
      if (result.success && result.url) {
        await mediaApi.create({
          source_type: 'UPLOAD',
          url: result.url,
          storage_key: result.storageKey || null,
          alt_text: file.name,
          name: file.name,
          mime_type: file.type,
          file_size: file.size,
        });
      }
    }
    await loadAssets();
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUrlAdd = async () => {
    if (!urlInput) return;
    // Validate URL
    try {
      new URL(urlInput);
    } catch {
      alert('Please enter a valid URL');
      return;
    }
    if (!urlInput.startsWith('https://')) {
      alert('Only HTTPS URLs are supported');
      return;
    }
    await mediaApi.create({
      source_type: 'URL',
      url: urlInput,
      alt_text: altInput || urlInput,
      name: altInput || urlInput.split('/').pop() || 'Image',
    });
    setUrlInput('');
    setAltInput('');
    setShowUrlForm(false);
    await loadAssets();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await mediaApi.delete(id);
    await loadAssets();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const filtered = assets.filter(a => 
    !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.alt_text?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="py-20 text-center text-taupe">Loading media library...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-serif text-3xl font-semibold text-espresso">Media Library</h1>
          <p className="text-taupe text-sm">{assets.length} images in your library</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowUrlForm(!showUrlForm)} className="flex items-center gap-2 border border-champagne text-espresso px-4 py-2.5 text-sm hover:bg-cream transition-colors">
            <LinkIcon size={14} /> Add URL
          </button>
          <label className="flex items-center gap-2 bg-espresso text-ivory px-4 py-2.5 text-sm font-medium hover:bg-espresso/90 transition-colors cursor-pointer">
            <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload'}
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* URL Form */}
      {showUrlForm && (
        <div className="bg-white border border-champagne/30 p-6 mb-6" style={{ borderRadius: 'var(--radius-md)' }}>
          <h3 className="text-sm font-medium text-espresso mb-4">Add Image by URL</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-taupe mb-1">Image URL (HTTPS only)</label>
              <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
            </div>
            <div>
              <label className="block text-xs text-taupe mb-1">Alt Text / Name</label>
              <input type="text" value={altInput} onChange={e => setAltInput(e.target.value)} placeholder="Descriptive name" className="w-full border border-champagne bg-ivory px-3 py-2 text-sm rounded" />
            </div>
            {urlInput && urlInput.startsWith('https://') && (
              <div className="flex items-center gap-3">
                <img src={urlInput} alt="Preview" className="w-24 h-16 object-cover rounded" onError={e => (e.currentTarget.style.display = 'none')} />
                <p className="text-xs text-green-600">✓ Valid HTTPS URL</p>
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={handleUrlAdd} className="bg-espresso text-ivory px-4 py-2 text-sm hover:bg-espresso/90">Add to Library</button>
              <button onClick={() => setShowUrlForm(false)} className="border border-champagne px-4 py-2 text-sm hover:bg-cream">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search images..." className="w-full border border-champagne bg-white pl-10 pr-4 py-2.5 text-sm rounded focus:border-light-gold focus:outline-none" />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-champagne/30 p-12 text-center">
          <p className="text-taupe mb-2">
            {search ? 'No images match your search.' : 'Your media library is empty.'}
          </p>
          <p className="text-sm text-taupe/70">Upload images or add image URLs to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(asset => (
            <div key={asset.id} className="bg-white border border-champagne/30 overflow-hidden group" style={{ borderRadius: 'var(--radius-md)' }}>
              <div className="aspect-square bg-cream relative overflow-hidden">
                <img src={asset.url} alt={asset.alt_text || ''} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23F5EFE3" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="%238B7A68" font-size="12">No image</text></svg>'; }} />
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => copyUrl(asset.url)} className="bg-white p-2 rounded hover:bg-cream" title="Copy URL">
                    <Copy size={14} className="text-espresso" />
                  </button>
                  <a href={asset.url} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded hover:bg-cream" title="Open">
                    <ExternalLink size={14} className="text-espresso" />
                  </a>
                  <button onClick={() => handleDelete(asset.id)} className="bg-white p-2 rounded hover:bg-red-50" title="Delete">
                    <Trash2 size={14} className="text-red-600" />
                  </button>
                </div>
                <span className={"absolute top-2 left-2 text-[9px] px-1.5 py-0.5 rounded " + (asset.source_type === 'UPLOAD' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')}>
                  {asset.source_type}
                </span>
              </div>
              <div className="p-2">
                <p className="text-xs text-espresso truncate">{asset.name || asset.alt_text || 'Untitled'}</p>
                <p className="text-[10px] text-taupe truncate">{new Date(asset.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
