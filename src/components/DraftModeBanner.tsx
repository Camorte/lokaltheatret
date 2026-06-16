'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { disableDraftMode } from '@/app/(website)/actions';

export default function DraftModeBanner() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const exit = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 16px',
        borderRadius: 9999,
        background: '#000',
        color: '#fff',
        fontSize: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <span>Viser utkast (draft)</span>
      <button
        onClick={exit}
        disabled={pending}
        style={{
          padding: '4px 12px',
          borderRadius: 9999,
          border: '1px solid #fff',
          background: 'transparent',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        {pending ? 'Avslutter…' : 'Avslutt'}
      </button>
    </div>
  );
}
