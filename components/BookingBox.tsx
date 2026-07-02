'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarCheck, ShoppingCart } from 'lucide-react';
import { addItem } from '@/lib/cart';

export interface BookingVariant {
  id: string;
  optionLabel: string;
  adult: number;
  child: number | null;
  adultLabel: string;
  childLabel: string;
}

export interface BookingBoxProps {
  tourId: string;
  cartUrl: string;
  labels: {
    title: string;
    selectProgram: string;
    date: string;
    dateRequired: string;
    total: string;
    bookNow: string;
    addToCart: string;
    added: string;
    note: string;
  };
  variants: BookingVariant[];
}

const fmt = (n: number) => `฿${n.toLocaleString('en-US')}`;

export default function BookingBox({ tourId, cartUrl, labels, variants }: BookingBoxProps) {
  const [selectedId, setSelectedId] = useState(variants[0]!.id);
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [added, setAdded] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [dateError, setDateError] = useState(false);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDate(tomorrow.toISOString().slice(0, 10));
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  const variant = useMemo(
    () => variants.find((v) => v.id === selectedId) ?? variants[0]!,
    [variants, selectedId],
  );

  const total = variant.adult * adults + (variant.child ?? 0) * children;

  function selectVariant(id: string) {
    setSelectedId(id);
    const v = variants.find((x) => x.id === id);
    if (v && v.child === null) setChildren(0);
  }

  /** Requires a travel date; returns false (and flags the field) without one. */
  function add(): boolean {
    if (!date) {
      setDateError(true);
      dateRef.current?.focus();
      dateRef.current?.showPicker?.();
      return false;
    }
    addItem({
      tour: tourId,
      variant: variant.id,
      date,
      adults,
      children,
    });
    return true;
  }

  function onAdd() {
    if (!add()) return;
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1600);
  }

  function onBook() {
    if (!add()) return;
    window.location.href = cartUrl;
  }

  return (
    <div className="bbox" id="bookingBox">
      <h2>{labels.title}</h2>
      <div className="fg">
        <label htmlFor="bkVariant">{labels.selectProgram}</label>
        <select id="bkVariant" value={selectedId} onChange={(e) => selectVariant(e.target.value)}>
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.optionLabel}
            </option>
          ))}
        </select>
      </div>
      <div className="fg">
        <label htmlFor="bkDate">{labels.date}</label>
        <input
          type="date"
          id="bkDate"
          ref={dateRef}
          className={dateError ? 'fg--error' : undefined}
          min={minDate || undefined}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (e.target.value) setDateError(false);
          }}
          required
          aria-invalid={dateError}
        />
        {dateError && <p className="fg__err">{labels.dateRequired}</p>}
      </div>
      <div className="bbox__row">
        <div className="stepper">
          <button type="button" aria-label="−" onClick={() => setAdults((n) => Math.max(1, n - 1))}>
            −
          </button>
          <span className="val">{adults}</span>
          <button type="button" aria-label="+" onClick={() => setAdults((n) => Math.min(40, n + 1))}>
            +
          </button>
          <span className="who">{variant.adultLabel}</span>
        </div>
      </div>
      {variant.child !== null && (
        <div className="bbox__row">
          <div className="stepper">
            <button
              type="button"
              aria-label="−"
              onClick={() => setChildren((n) => Math.max(0, n - 1))}
            >
              −
            </button>
            <span className="val">{children}</span>
            <button
              type="button"
              aria-label="+"
              onClick={() => setChildren((n) => Math.min(40, n + 1))}
            >
              +
            </button>
            <span className="who">{variant.childLabel}</span>
          </div>
        </div>
      )}
      <div className="bbox__total">
        <span className="lbl">{labels.total}</span>
        <span className="amt">{fmt(total)}</span>
      </div>
      <div className="bbox__btns">
        <button type="button" className="btn-gold" onClick={onBook}>
          <CalendarCheck size={16} />
          {labels.bookNow}
        </button>
        <button type="button" className="btn-navy" onClick={onAdd}>
          {added ? (
            labels.added
          ) : (
            <>
              <ShoppingCart size={16} />
              {labels.addToCart}
            </>
          )}
        </button>
      </div>
      <p className="bbox__note">{labels.note}</p>
    </div>
  );
}
