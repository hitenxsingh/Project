import React, { useState } from 'react';
import { User, Role } from '../types';
import { Edit2, Trash2, UserPlus } from 'lucide-react';
import { mockRoles } from '../data/mockData';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete, onAdd }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // To toggle dropdown for mobile
  const roleMap = mockRoles.reduce((acc: Record<string, Role>, role) => {
    acc[role.id] = role;
    return acc;
  }, {});

  const toggleUserDetails = (id: string) => {
    setSelectedUser(selectedUser === id ? null : id); // Toggle visibility
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add User</span> {/* Hide text on small screens */}
        </button>
      </div>

      {/* Mobile view toggle */}
      <div className="overflow-x-auto sm:hidden">
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No users found. Click "Add User" to create a new one.</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border-b p-4 cursor-pointer" onClick={() => toggleUserDetails(user.id)}>
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              {/* Dropdown content */}
              {selectedUser === user.id && (
                <div className="mt-2 pl-12">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Role:</span>
                    <span>{roleMap[user.roleId]?.name || 'Unknown Role'}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-semibold text-gray-600">Status:</span>
                    <span className={`${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent toggling user details
                        onEdit(user);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent toggling user details
                        onDelete(user.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Desktop/table view */}
      <div className="hidden sm:block">
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No users found. Click "Add User" to create a new one.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {roleMap[user.roleId]?.name || 'Unknown Role'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                        aria-label="Edit user"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Delete user"
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

export default UserList;
