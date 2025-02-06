'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Email: ', email);
    console.log('Password: ', password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="pt-[13.6rem]">
        <Image src="/images/desub_logo.png" alt="desub_logo" width={460} height={105} />
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
        <div className="pt-[5.5rem]">
          <Button type="submit" variant="black" size="full">
            Login
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
