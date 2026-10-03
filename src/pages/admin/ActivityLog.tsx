import { useState, useEffect } from 'react';
import { usersApi } from '../../services/usersApi';
import { PermissionGuard } from '../../components/PermissionGuard';
import { PERMISSIONS } from '../../lib/permissions';
import { Activity, User, Clock, FileText } from 'lucide-react';

export default function ActivityLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const result = await usersApi.getAuditLogs(200);
    if (result.success) {
      setLogs(result.data || []);
    }
    setLoading(false);
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      CREATE: 'bg-green-100 text-green-700',
      UPDATE: 'bg-blue-100 text-blue-700',
      DELETE: 'bg-red-100 text-red-700',
      PUBLISH: 'bg-purple-100 text-purple-700',
      LOGIN: 'bg-indigo-100 text-indigo-700',
    };
    return colors[action] || 'bg-gray-100 text-gray-700';
  };

  const getModuleIcon = (module: string) => {
    const icons: Record<string, string> = {
      designs: '📦',
      collections: '📁',
      bookings: '📋',
      homepage: '🏠',
      appearance: '🎨',
      media: '🖼️',
      users: '👥',
      settings: '⚙️',
    };
    return icons[module] || '📄';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-light-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <PermissionGuard permission={PERMISSIONS.AUDIT_VIEW}>
      <div>
        <div className="mb-8">
          <h1 className="heading-serif text-3xl font-semibold text-espresso mb-2">Activity Log</h1>
          <p className="text-taupe">Track all administrative actions across the platform</p>
        </div>

        {logs.length === 0 ? (
          <div className="bg-white border border-champagne/30 rounded-lg p-12 text-center">
            <Activity size={48} className="mx-auto text-champagne mb-4" />
            <p className="text-taupe">No activity recorded yet</p>
          </div>
        ) : (
          <div className="bg-white border border-champagne/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-champagne/30 bg-cream/30">
                    <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Timestamp</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Action</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Module</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne/20">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-cream/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-taupe">
                          <Clock size={14} />
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-taupe" />
                          <span className="text-sm text-espresso">{log.user_email || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getModuleIcon(log.module)}</span>
                          <span className="text-sm text-espresso capitalize">{log.module}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-taupe max-w-md">
                          {log.object_type && (
                            <span className="inline-flex items-center gap-1">
                              <FileText size={12} />
                              {log.object_type}
                              {log.object_id && (
                                <span className="text-xs text-champagne">#{log.object_id.slice(0, 8)}</span>
                              )}
                            </span>
                          )}
                          {log.details && Object.keys(log.details).length > 0 && (
                            <div className="mt-1 text-xs">
                              {Object.entries(log.details).map(([key, value]) => (
                                <span key={key} className="inline-block mr-3">
                                  <span className="text-champagne">{key}:</span> {String(value)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-cream/30 rounded-lg">
          <p className="text-sm text-taupe">
            <strong>Note:</strong> Activity logs are retained for audit purposes. Sensitive information like passwords is never logged.
          </p>
        </div>
      </div>
    </PermissionGuard>
  );
}
