import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const TokenChecker = () => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    checkTokenAndRedirect(token, router);
  }, []);

  function checkTokenAndRedirect(token: string | null, router: ReturnType<typeof useRouter>) {
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const expired = isTokenExpired(token);
      if (expired) {
        router.push('/login');
        return;
      }
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  }

  function isTokenExpired(token: string): boolean {
    const decoded = jwt.decode(token) as { exp: number };
    if (decoded && decoded.exp) {
      const expirationDate = decoded.exp * 1000;
      return Date.now() > expirationDate;
    }
    return true;
  }

  return null;
};

export default TokenChecker;
