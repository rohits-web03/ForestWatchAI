import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('https://forestwatchai-714k.onrender.com/auth-check', { withCredentials: true });
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
