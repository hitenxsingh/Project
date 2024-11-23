import React, { useState } from 'react';
import { Role } from '../types';

interface AddRoleFormProps {
  onAdd: (newRole: Role) => void;
  onCancel: () => void;
}

const AddRoleForm: React.FC<AddRoleFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});

  // Track new resource and permission for input fields
  const [newResource, setNewResource] = useState('');
  const [newPermission, setNewPermission] = useState('');

  const handleAddPermission = () => {
    if (newResource.trim() && newPermission.trim()) {
      setPermissions((prev) => ({
        ...prev,
        [newResource]: [...(prev[newResource] || []), newPermission],
      }));
      setNewResource('');
      setNewPermission('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({
        id: Date.now().toString(), // Generate unique ID
        name,
        description,
        permissions,
      });
      setName('');
      setDescription('');
      setPermissions({});
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-100 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Permissions Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Permissions</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Resource (e.g., 'user')"
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Permission (e.g., 'read')"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleAddPermission}
              className="btn btn-secondary"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(permissions).map(([resource, perms]) => (
              <div key={resource} className="text-sm mb-1">
                <strong>{resource}:</strong> {perms.join(', ')}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Add</button>
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddRoleForm;

