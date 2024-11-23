import { useState } from 'react';
import RoleList from '../components/RoleList';
import { mockRoles } from '../data/mockData';
import { Role } from '../types';

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);

  const handleEdit = (role: Role) => {
    // Implement edit logic
    console.log('Edit role:', role);
  };

  const handleDelete = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleAdd = () => {
    // Implement add logic
    console.log('Add new role');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Role Management</h1>
      <RoleList
        roles={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Roles;