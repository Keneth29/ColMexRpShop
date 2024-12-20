import { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username: string, password: string) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout
  };
}