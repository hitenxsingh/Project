import React, { useState } from 'react';
import { User } from '../types';

interface AddUserFormProps {
  onAdd: (newUser: User) => void;
  onCancel: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active'); // default to 'active'
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && roleId) {
      // Create the new user object with all fields
      const newUser: User = {
        id: Date.now().toString(), // Generate unique ID
        name,
        email,
        roleId,
        status,
        avatar,
      };

      // Call the onAdd function with the new user
      onAdd(newUser);

      // Clear the form
      setName('');
      setEmail('');
      setRoleId('');
      setStatus('active'); // Reset to 'active'
      setAvatar('');
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-100 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a Role</option>
            <option value="1">Admin</option>
            <option value="2">Editor</option>
            <option value="3">Viewer</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avatar (URL)</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
