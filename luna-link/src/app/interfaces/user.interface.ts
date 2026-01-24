export type UserRole = 'ADMIN' | 'RESIDENT';

export interface User {
  id?: number; 
  login: string;
  password?: string; 
  role: UserRole;
}