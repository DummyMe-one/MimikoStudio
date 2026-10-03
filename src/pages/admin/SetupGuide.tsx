import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';

export default function SetupGuide() {
  const [checks, setChecks] = useState({
    envConfigured: false,
    tablesExist: false,
    storageBucket: false,
    adminUser: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    const envOk = isSupabaseConfigured();
    
    let tablesOk = false;
    let storageOk = false;
    let userOk = false;

    if (envOk) {
      // Check if tables exist
      try {
        const { error } = await supabase.from('collections').select('id').limit(1);
        tablesOk = !error;
      } catch (e) {
        tablesOk = false;
      }

      // Check if storage bucket exists
      try {
        const { data, error } = await supabase.storage.getBucket('designs');
        storageOk = !error && data !== null;
      } catch (e) {
        storageOk = false;
      }

      // Check if current user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      userOk = user !== null;
    }

    setChecks({
      envConfigured: envOk,
      tablesExist: tablesOk,
      storageBucket: storageOk,
      adminUser: userOk,
    });
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const allComplete = Object.values(checks).every(v => v);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-taupe">Checking setup...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="heading-serif text-3xl font-semibold text-espresso mb-2">Setup Guide</h1>
        <p className="text-taupe">Complete these steps to get your admin panel working</p>
      </div>

      {/* Status Overview */}
      <div className={`p-6 mb-8 border-2 ${allComplete ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-start gap-3">
          {allComplete ? (
            <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h2 className="text-lg font-semibold text-espresso mb-1">
              {allComplete ? '✅ All Set! Your admin panel is ready.' : '⚠️ Setup In Progress'}
            </h2>
            <p className="text-sm text-taupe">
              {allComplete 
                ? 'You can now manage designs, view bookings, and handle inquiries.'
                : 'Complete the steps below to fully configure your admin panel.'}
            </p>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-6">
        {/* Step 1: Environment Variables */}
        <div className="bg-white border border-champagne/30 p-6">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              checks.envConfigured ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {checks.envConfigured ? <CheckCircle size={20} /> : <span className="text-sm font-bold">1</span>}
            </div>
            <div className="flex-1">
              <h3 className="heading-serif text-xl font-semibold text-espresso mb-2">
                Environment Variables {checks.envConfigured && '✓'}
              </h3>
              <p className="text-sm text-taupe mb-4">
                Your Supabase credentials are configured.
              </p>
              {checks.envConfigured ? (
                <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800">
                  ✅ Supabase URL and anon key are set
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-800">
                  ❌ Create a .env file with your Supabase credentials
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Database Schema */}
        <div className="bg-white border border-champagne/30 p-6">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              checks.tablesExist ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {checks.tablesExist ? <CheckCircle size={20} /> : <span className="text-sm font-bold">2</span>}
            </div>
            <div className="flex-1">
              <h3 className="heading-serif text-xl font-semibold text-espresso mb-2">
                Database Schema {checks.tablesExist && '✓'}
              </h3>
              <p className="text-sm text-taupe mb-4">
                Run the SQL schema to create all tables, policies, and default collections.
              </p>
              
              {checks.tablesExist ? (
                <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800">
                  ✅ Database tables are created
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-800">
                    ❌ Database tables not found
                  </div>
                  <div className="bg-cream/50 p-4 rounded">
                    <p className="text-sm font-medium text-espresso mb-2">How to fix:</p>
                    <ol className="text-sm text-taupe space-y-2 list-decimal list-inside">
                      <li>
                        Go to{' '}
                        <a 
                          href="https://supabase.com/dashboard/project/gnojncipluesigzwonch/sql" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-gold underline inline-flex items-center gap-1"
                        >
                          Supabase SQL Editor <ExternalLink size={12} />
                        </a>
                      </li>
                      <li>Click "New Query"</li>
                      <li>Copy the SQL from <code className="bg-white px-1.5 py-0.5 rounded text-xs">supabase/schema.sql</code></li>
                      <li>Paste it into the editor and click "Run"</li>
                      <li>Wait for it to complete (should take ~10 seconds)</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Storage Bucket */}
        <div className="bg-white border border-champagne/30 p-6">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              checks.storageBucket ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {checks.storageBucket ? <CheckCircle size={20} /> : <span className="text-sm font-bold">3</span>}
            </div>
            <div className="flex-1">
              <h3 className="heading-serif text-xl font-semibold text-espresso mb-2">
                Storage Bucket {checks.storageBucket && '✓'}
              </h3>
              <p className="text-sm text-taupe mb-4">
                Create a storage bucket for product images.
              </p>
              
              {checks.storageBucket ? (
                <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800">
                  ✅ Storage bucket "designs" exists
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-800">
                    ❌ Storage bucket "designs" not found
                  </div>
                  <div className="bg-cream/50 p-4 rounded">
                    <p className="text-sm font-medium text-espresso mb-2">How to fix:</p>
                    <ol className="text-sm text-taupe space-y-2 list-decimal list-inside">
                      <li>
                        Go to{' '}
                        <a 
                          href="https://supabase.com/dashboard/project/gnojncipluesigzwonch/storage" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-gold underline inline-flex items-center gap-1"
                        >
                          Supabase Storage <ExternalLink size={12} />
                        </a>
                      </li>
                      <li>Click "New bucket"</li>
                      <li>Name: <code className="bg-white px-1.5 py-0.5 rounded text-xs">designs</code></li>
                      <li>Toggle <strong>"Public bucket"</strong> ON</li>
                      <li>Click "Create bucket"</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 4: Admin User */}
        <div className="bg-white border border-champagne/30 p-6">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              checks.adminUser ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {checks.adminUser ? <CheckCircle size={20} /> : <span className="text-sm font-bold">4</span>}
            </div>
            <div className="flex-1">
              <h3 className="heading-serif text-xl font-semibold text-espresso mb-2">
                Admin User {checks.adminUser && '✓'}
              </h3>
              <p className="text-sm text-taupe mb-4">
                Create an admin user to access the dashboard.
              </p>
              
              {checks.adminUser ? (
                <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800">
                  ✅ You are logged in as admin
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-800">
                    ❌ No admin user logged in
                  </div>
                  <div className="bg-cream/50 p-4 rounded">
                    <p className="text-sm font-medium text-espresso mb-2">How to fix:</p>
                    <ol className="text-sm text-taupe space-y-2 list-decimal list-inside">
                      <li>
                        Go to{' '}
                        <a 
                          href="https://supabase.com/dashboard/project/gnojncipluesigzwonch/auth/users" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-gold underline inline-flex items-center gap-1"
                        >
                          Supabase Authentication <ExternalLink size={12} />
                        </a>
                      </li>
                      <li>Click "Add user" → "Create new user"</li>
                      <li>Enter your email and choose a password</li>
                      <li>✅ Check <strong>"Auto Confirm User"</strong></li>
                      <li>Click "Create user"</li>
                      <li>Then login at <a href="#/admin/login" className="text-muted-gold underline">/#/admin/login</a></li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {allComplete && (
        <div className="mt-8 bg-white border border-champagne/30 p-6">
          <h3 className="heading-serif text-xl font-semibold text-espresso mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a 
              href="#/admin/designs" 
              className="flex items-center gap-3 p-4 border border-champagne/50 hover:border-light-gold hover:bg-cream/30 transition-colors"
            >
              <div className="w-10 h-10 bg-light-gold/10 rounded-full flex items-center justify-center">
                <span className="text-lg">📦</span>
              </div>
              <div>
                <p className="text-sm font-medium text-espresso">Manage Designs</p>
                <p className="text-xs text-taupe">Add, edit, or delete products</p>
              </div>
            </a>
            <a 
              href="#/admin/bookings" 
              className="flex items-center gap-3 p-4 border border-champagne/50 hover:border-light-gold hover:bg-cream/30 transition-colors"
            >
              <div className="w-10 h-10 bg-light-gold/10 rounded-full flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <p className="text-sm font-medium text-espresso">View Bookings</p>
                <p className="text-xs text-taupe">Check customer inquiries</p>
              </div>
            </a>
            <a 
              href="#/admin/collections" 
              className="flex items-center gap-3 p-4 border border-champagne/50 hover:border-light-gold hover:bg-cream/30 transition-colors"
            >
              <div className="w-10 h-10 bg-light-gold/10 rounded-full flex items-center justify-center">
                <span className="text-lg">📁</span>
              </div>
              <div>
                <p className="text-sm font-medium text-espresso">Manage Collections</p>
                <p className="text-xs text-taupe">Organize product categories</p>
              </div>
            </a>
            <a 
              href="#/admin/messages" 
              className="flex items-center gap-3 p-4 border border-champagne/50 hover:border-light-gold hover:bg-cream/30 transition-colors"
            >
              <div className="w-10 h-10 bg-light-gold/10 rounded-full flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
              <div>
                <p className="text-sm font-medium text-espresso">View Messages</p>
                <p className="text-xs text-taupe">Read contact enquiries</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => { setLoading(true); checkSetup(); }}
          className="text-sm text-muted-gold hover:underline"
        >
          Refresh status check
        </button>
      </div>
    </div>
  );
}
