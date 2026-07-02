'use client';

import { useEffect, useState } from 'react';
import { count } from '@/lib/cart';

export default function CartBadge() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const render = () => setN(count());
    render();
    document.addEventListener('cart:change', render);
    window.addEventListener('storage', render);
    return () => {
      document.removeEventListener('cart:change', render);
      window.removeEventListener('storage', render);
    };
  }, []);
  return <span className={`nav__cart-n${n > 0 ? ' show' : ''}`}>{n}</span>;
}
