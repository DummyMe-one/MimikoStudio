import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usersApi } from '../../services/usersApi';
import { PermissionGuard } from '../../components/PermissionGuard';
import { PERMISSIONS } from '../../lib/permissions';
import { Shield, UserCheck, UserX, Edit2, Save, X } from 'lucide-react';

export default function UsersManager() {
  const { hasPermission, refreshProfile } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>('');
  const [editStatus, setEditStatus] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [usersRes, rolesRes] = await Promise.all([
      usersApi.getAllUsers(),
      usersApi.getRoles(),
    ]);
    if (usersRes.success) setUsers(usersRes.data || []);
    if (rolesRes.success) setRoles(rolesRes.data || []);
    setLoading(false);
  };

  const startEdit = (user: any) => {
    setEditingId(user.id);
    setEditRole(user.roles?.[0]?.id || '');
    setEditStatus(user.status);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRole('');
    setEditStatus('');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    
    if (editRole) {
      await usersApi.updateUserRole(editingId, editRole);
    }
    if (editStatus) {
      await usersApi.updateUserStatus(editingId, editStatus);
    }
    
    await usersApi.logAuditEvent('UPDATE', 'users', 'user', editingId, {
      role_id: editRole,
      status: editStatus,
    });
    
    await loadData();
    cancelEdit();
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-700',
      INVITED: 'bg-blue-100 text-blue-700',
      SUSPENDED: 'bg-yellow-100 text-yellow-700',
      DISABLED: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-light-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <PermissionGuard permission={PERMISSIONS.USERS_VIEW}>
      <div>
        <div className="mb-8">
          <h1 className="heading-serif text-3xl font-semibold text-espresso mb-2">User Management</h1>
          <p className="text-taupe">Manage admin users and their roles</p>
        </div>

        <div className="bg-white border border-champagne/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-champagne/30 bg-cream/30">
                  <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Last Login</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-taupe uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne/20">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-gold to-champagne flex items-center justify-center text-white font-semibold">
                          {(user.name || user.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-espresso">{user.name || 'Unnamed'}</p>
                          <p className="text-sm text-taupe">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="px-3 py-1.5 border border-champagne rounded text-sm"
                        >
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-gold/10 text-muted-gold text-sm font-medium">
                          <Shield size={14} />
                          {user.roles?.[0]?.name?.replace('_', ' ') || 'No Role'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="px-3 py-1.5 border border-champagne rounded text-sm"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="SUSPENDED">Suspended</option>
                          <option value="DISABLED">Disabled</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(user.status)}`}>
                          {user.status === 'ACTIVE' ? <UserCheck size={14} /> : <UserX size={14} />}
                          {user.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-taupe">
                      {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === user.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={saveEdit}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Save"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 text-taupe hover:bg-cream rounded transition-colors"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(user)}
                          className="p-2 text-taupe hover:text-espresso hover:bg-cream rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-cream/30 rounded-lg">
          <p className="text-sm text-taupe">
            <strong>Note:</strong> Role changes take effect immediately. Users will need to refresh their browser to see updated permissions.
          </p>
        </div>
      </div>
    </PermissionGuard>
  );
}
