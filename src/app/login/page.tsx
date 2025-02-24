'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        throw new Error(data.message || '로그인에 실패했습니다');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="pt-[13.6rem]">
        <Image src="/images/desub_logo.png" alt="desub_logo" width={460} height={105} priority />
      </div>
      <h1 className="pt-[3.689rem] font-semibold text-[4rem] poppins">Admin</h1>

      <form onSubmit={onSubmit} className="w-[54rem] space-y-[2rem] pt-[6.9rem]">
        <Input
          type="email"
          placeholder="partner@desub.kr"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="pt-[5.5rem]">
          <Button type="submit" variant="black" size="full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </form>

      <footer className="pt-[24.4rem] pb-[9.8rem] text-[1.3rem] text-[#4D4D4D] space-y-[1.3rem] text-center">
        <p>(c)2025 desub</p>
        <p>v.1.0</p>
      </footer>
    </div>
  );
};

export default Login;
