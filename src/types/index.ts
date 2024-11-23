export type Permission = 'create' | 'read' | 'update' | 'delete';

export type Resource = 'users' | 'roles' | 'products' | 'orders';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, string[]>; // Permissions as an object with resource-permission pairs
}
