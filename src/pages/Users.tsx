import React, { useState } from 'react';
import UserList from '../components/UserList';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleEdit = (user: User) => {
    // Implement edit logic
    console.log('Edit user:', user);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAdd = () => {
    // Implement add logic
    console.log('Add new user');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Users;