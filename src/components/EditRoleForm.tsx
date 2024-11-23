import React, { useState } from 'react';
import { Role } from '../types';

interface EditRoleFormProps {
  role: Role;
  onUpdate: (updatedRole: Role) => void;
  onCancel: () => void;
}

const EditRoleForm: React.FC<EditRoleFormProps> = ({ role, onUpdate, onCancel }) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description || '');
  const [permissions, setPermissions] = useState(role.permissions || {});
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

  const handleRemovePermission = (resource: string, permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [resource]: prev[resource].filter((perm) => perm !== permission),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onUpdate({ ...role, name, description, permissions });
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-100 mb-4">
      <h2 className="text-xl font-semibold mb-4">Edit Role</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        {/* Description Field */}
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
          
          {/* Display Current Permissions */}
          <div className="mt-2">
            {Object.entries(permissions).map(([resource, perms]) => (
              <div key={resource} className="mb-2">
                <strong>{resource}:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {perms.map((perm) => (
                    <span
                      key={perm}
                      className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-sm"
                    >
                      {perm}
                      <button
                        type="button"
                        onClick={() => handleRemovePermission(resource, perm)}
                        className="text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Update</button>
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditRoleForm;
