import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:8000/auth-check', { withCredentials: true });
        setAuth(res.data.isAuthenticated);
      } catch (error) {
        setAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  return auth;
};

export default useAuth;
