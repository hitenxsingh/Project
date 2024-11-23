import React, { useState } from 'react';
import RoleList from '../components/RoleList';
import AddRoleForm from '../components/AddRoleForm';
import EditRoleForm from '../components/EditRoleForm';
import { mockRoles } from '../data/mockData';
import { Role } from '../types';

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles); // State for roles
  const [editingRole, setEditingRole] = useState<Role | null>(null); // State for the role being edited
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle AddRoleForm visibility

  // Handle editing a role
  const handleEdit = (role: Role) => {
    setEditingRole(role); // Set the role to be edited
  };

  // Handle updating a role after editing
  const handleUpdate = (updatedRole: Role) => {
    setRoles(roles.map(role => (role.id === updatedRole.id ? updatedRole : role))); // Update roles
    setEditingRole(null); // Close the edit form
  };

  // Handle deleting a role
  const handleDelete = (id: string) => {
    setRoles(roles.filter(role => role.id !== id)); // Filter out the deleted role
  };

  // Handle adding a new role
  const handleAdd = (newRole: Role) => {
    setRoles([...roles, newRole]); // Add the new role
    setShowAddForm(false); // Hide the add form
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Role Management</h1>

      {/* Role List */}
      <RoleList
        roles={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={() => setShowAddForm(true)} // Toggle AddRoleForm
      />

      {/* Add Role Form */}
      {showAddForm && (
        <div className="mt-6">
          <AddRoleForm
            onAdd={handleAdd}
            onCancel={() => setShowAddForm(false)} // Cancel button closes form
          />
        </div>
      )}

      {/* Edit Role Form */}
      {editingRole && (
        <div className="mt-6">
          <EditRoleForm
            role={editingRole}
            onUpdate={handleUpdate}
            onCancel={() => setEditingRole(null)} // Cancel button closes form
          />
        </div>
      )}
    </div>
  );
};

export default Roles;
