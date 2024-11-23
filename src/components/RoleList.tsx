import React from 'react';
import { Role } from '../types';
import { Edit2, Trash2, ShieldPlus } from 'lucide-react';

interface RoleListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const RoleList: React.FC<RoleListProps> = ({ roles, onEdit, onDelete, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Roles</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ShieldPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Role</span>
        </button>
      </div>

      {/* Mobile view toggle */}
      <div className="overflow-x-auto sm:hidden">
        {roles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No roles found. Click "Add Role" to create a new one.</div>
        ) : (
          roles.map((role) => (
            <div key={role.id} className="border-b p-4 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-900">{role.name}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(role)}
                    className="text-indigo-600 hover:text-indigo-900"
                    aria-label={`Edit role ${role.name}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(role.id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Delete role ${role.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Role details dropdown */}
              <div className="mt-2">
                <div className="text-sm text-gray-500">Description: {role.description || 'No description'}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(role.permissions || {}).map(([resource, perms]) => (
                    <div key={resource} className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                      {resource}: {perms.join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop/table view */}
      <div className="hidden sm:block">
        {roles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No roles found. Click "Add Role" to create a new one.</div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id}>
                  {/* Role Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{role.name}</div>
                  </td>
                  {/* Description */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{role.description || 'No description'}</div>
                  </td>
                  {/* Permissions */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(role.permissions || {}).map(([resource, perms]) => (
                        <div
                          key={resource}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 rounded"
                        >
                          {resource}: {perms.join(', ')}
                        </div>
                      ))}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      {/* Edit */}
                      <button
                        onClick={() => onEdit(role)}
                        className="text-indigo-600 hover:text-indigo-900"
                        aria-label={`Edit role ${role.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => onDelete(role.id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label={`Delete role ${role.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RoleList;
