"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;

  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;

  subtotalCents: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "soirn_cart_v1";

function safeParse(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return safeParse(localStorage.getItem(STORAGE_KEY));
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex(
        (p) => p.slug === item.slug && p.size === item.size
      );
      if (i === -1) return [...prev, { ...item, qty }];
      const copy = [...prev];
      copy[i] = { ...copy[i], qty: copy[i].qty + qty };
      return copy;
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string, size: string) => {
    setItems((prev) =>
      prev.filter((p) => !(p.slug === slug && p.size === size))
    );
  };

  const setQty = (slug: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.slug === slug && p.size === size ? { ...p, qty } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const subtotalCents = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
        addItem,
        removeItem,
        setQty,
        clear: () => setItems([]),
        subtotalCents,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider />");
  }
  return ctx;
}
