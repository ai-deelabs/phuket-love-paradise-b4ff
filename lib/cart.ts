// localStorage cart store. Only IDs and quantities live here — prices and
// titles are always resolved from build-emitted catalog data at render time.

export interface CartItem {
  id: string;
  tour: string;
  variant: string;
  date: string; // ISO yyyy-mm-dd or ''
  adults: number;
  children: number;
}

interface CartState {
  v: 1;
  items: CartItem[];
  updatedAt: number;
}

const KEY = 'plp:cart:v1';

const empty = (): CartState => ({ v: 1, items: [], updatedAt: Date.now() });

export function getCart(): CartState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as CartState;
    if (parsed?.v !== 1 || !Array.isArray(parsed.items)) return empty();
    return parsed;
  } catch {
    return empty();
  }
}

function save(state: CartState): void {
  state.updatedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(state));
  document.dispatchEvent(new CustomEvent('cart:change', { detail: { count: count() } }));
}

export function addItem(item: Omit<CartItem, 'id'>): void {
  const state = getCart();
  const existing = state.items.find(
    (i) => i.tour === item.tour && i.variant === item.variant && i.date === item.date,
  );
  if (existing) {
    existing.adults += item.adults;
    existing.children += item.children;
  } else {
    state.items.push({ ...item, id: Math.random().toString(36).slice(2, 10) });
  }
  save(state);
}

export function updateItem(id: string, patch: Partial<Omit<CartItem, 'id'>>): void {
  const state = getCart();
  const item = state.items.find((i) => i.id === id);
  if (!item) return;
  Object.assign(item, patch);
  save(state);
}

export function removeItem(id: string): void {
  const state = getCart();
  state.items = state.items.filter((i) => i.id !== id);
  save(state);
}

export function clearCart(): void {
  save(empty());
}

export function count(): number {
  return getCart().items.length;
}

/** Wire a badge element: shows item count, hides at zero, syncs across tabs. */
export function bindBadge(el: HTMLElement): void {
  const render = () => {
    const n = count();
    el.textContent = String(n);
    el.classList.toggle('show', n > 0);
  };
  document.addEventListener('cart:change', render);
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) render();
  });
  render();
}
