import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface EditUserFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onUpdate, onCancel }) => {
  // Initialize state values with user data
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [roleId, setRoleId] = useState<string>(user.roleId || ''); // Default to empty string if roleId is undefined
  const [status, setStatus] = useState<'active' | 'inactive'>(user.status);
  const [avatar, setAvatar] = useState<string>(user.avatar);

  useEffect(() => {
    // Syncing the form inputs with user props if they change
    console.log('User data in EditUserForm:', user); // Debugging line
    setName(user.name);
    setEmail(user.email);
    setRoleId(user.roleId || ''); // Make sure the roleId is correct
    setStatus(user.status);
    setAvatar(user.avatar);
  }, [user]); // Trigger effect when 'user' prop changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Debugging line to confirm the values being submitted
    console.log('Updated user values:', { name, email, roleId, status, avatar });

    if (name.trim() && email.trim() && roleId) { // Ensure roleId is selected
      onUpdate({ ...user, name, email, roleId, status, avatar });
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-100 mb-4">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Role Field (Dropdown with 1=admin, 2=editor, 3=viewer) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a Role</option> {/* Empty option for validation */}
            <option value="1">Admin</option>
            <option value="2">Editor</option>
            <option value="3">Viewer</option>
          </select>
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Avatar Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Update</button>
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
