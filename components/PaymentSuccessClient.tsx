'use client';

import { useEffect } from 'react';
import { clearCart } from '@/lib/cart';

/** The deposit is paid — empty the cart so the badge zeroes out. */
export default function PaymentSuccessClient() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
