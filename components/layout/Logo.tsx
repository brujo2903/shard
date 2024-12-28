'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 relative">
        <Image
          src="https://i.imgur.com/L2fOzwL.png"
          alt="Shard Logo"
          width={32}
          height={32}
          className="object-contain"
          priority
        />
      </div>
      <span className="font-bold text-xl text-white">shard</span>
    </Link>
  );
}