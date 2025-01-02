"use client"

import "@/app/globals.css"
import styles from "@/app/global_styles/login_page/loginPage.module.scss";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      router.push('/admin_page');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Ошибка авторизации');
      } else {
        setError('Ошибка авторизации. Проверьте данные.');
      }
    }
  };

  return (
    <div className={styles.login_page}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="dracarys@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        {error && <p>{error}</p>}
      </form>
      </div>
  );
};

export default LoginPage;

