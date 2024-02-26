'use client';
import { useAppSelector } from '@/components/hooks/useAppSelector';
import { useAuth } from '@/redux/auth/auth';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export const ChannelProvader = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(useAuth);

  useLayoutEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, []);

  return <>{children}</>;
};
