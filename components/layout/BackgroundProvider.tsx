'use client';

import { useEffect, useState } from 'react';
import { GridBackground } from './GridBackground';

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && <GridBackground />}
      {children}
    </>
  );
}