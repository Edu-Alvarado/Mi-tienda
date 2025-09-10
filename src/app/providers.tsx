'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SearchProvider } from '@/context/SearchContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <SearchProvider>
      <AuthProvider>{children}</AuthProvider>
    </SearchProvider>;
}
