import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { auth } from '../../services/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await auth.login(password);
      if (result.success && result.data?.token) {
        localStorage.setItem('adminToken', result.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Invalid password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/30 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="heading-serif text-3xl font-semibold text-espresso mb-2">
            Admin Access
          </h1>
          <p className="text-taupe text-sm">Mimiko Studio Management Panel</p>
        </div>

        <div className="bg-white p-8 shadow-sm border border-champagne/30">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-champagne bg-ivory px-4 py-3 pr-12 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-espresso transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso text-ivory py-3 text-sm font-sans font-medium hover:bg-espresso/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock size={16} />
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-taupe mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
