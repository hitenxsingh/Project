import React, { useState } from 'react';
import UserList from '../components/UserList';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Handle editing a user
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // Handle updating a user after editing
  const handleUpdate = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null); // Close edit form
  };

  // Handle deleting a user
  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id)); // Remove deleted user
  };

  // Handle adding a new user
  const handleAdd = (newUser: User) => {
    setUsers([...users, newUser]);
    setIsAdding(false); // Close add form
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* User List */}
      <div className="mb-6">
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => setIsAdding(true)} // Open Add User Form
        />
      </div>

      {/* Add User Form */}
      {isAdding && (
        <div className="mt-6">
          <AddUserForm
            onAdd={handleAdd}
            onCancel={() => setIsAdding(false)} // Close Add User Form
          />
        </div>
      )}

      {/* Edit User Form */}
      {editingUser && (
        <div className="mt-6">
          <EditUserForm
            user={editingUser}
            onUpdate={handleUpdate}
            onCancel={() => setEditingUser(null)} // Close Edit User Form
          />
        </div>
      )}
    </div>
  );
};

export default Users;
