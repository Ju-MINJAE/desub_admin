'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../ui/Sidebar';

const ConditionalSidebar = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  if (isLoginPage) return null;

  return <Sidebar />;
};

export default ConditionalSidebar;
