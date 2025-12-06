'use client';
import React, { useEffect, useState, useRef } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';
import SalesChart from './SalesChart';

export default function Catalog({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const intervalRef = useRef(null);
  const mountedRef = useRef(true);

  // Fetch products on mount
  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();

    async function load() {
      setStatus({ loading: true, error: null });
      try {
        const res = await fetch('/api/products', { signal: controller.signal });
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        if (!mountedRef.current) return;
        setProducts(data);
        setStatus({ loading: false, error: null });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setStatus({ loading: false, error: err.message || 'Unknown error' });
      }
    }
    load();

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, []);

  // Simulate inventory changes: reduce stock of a random product occasionally
  useEffect(() => {
    // do nothing until products loaded
    if (!products || products.length === 0) return;

    intervalRef.current = setInterval(() => {
      setProducts(prev => {
        if (!prev || prev.length === 0) return prev;
        // pick a random product index
        const idx = Math.floor(Math.random() * prev.length);
        const picked = prev[idx];
        // 50% chance to decrement stock if stock > 0
        if (picked.stock > 0 && Math.random() < 0.5) {
          const copy = prev.map((p, i) => (i === idx ? { ...p, stock: p.stock - 1 } : p));
          return copy;
        }
        return prev;
      });
    }, 5000); // every 5 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [products.length]);

  // Filtering
  const filtered = products.filter(p => {
    if (category !== 'All' && p.category !== category) return false;
    if (maxPrice !== '') {
      const max = Number(maxPrice);
      if (Number.isFinite(max) && p.price > max) return false;
    }
    return true;
  });

  // Cart
  function addToCart(productId) {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, stock: Math.max(0, p.stock - 1) } : p)));
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  }

  function decrementCart(productId) {
    setCart(prev => {
      const cur = prev[productId] || 0;
      if (cur <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: cur - 1 };
    });
    // return item to stock
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, stock: p.stock + 1 } : p)));
  }

  function resetCart() {
    // return all items to stock
    setProducts(prev => {
      const copy = prev.map(p => {
        const qty = cart[p.id] || 0;
        return qty > 0 ? { ...p, stock: p.stock + qty } : p;
      });
      return copy;
    });
    setCart({});
  }

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Transform cart object into an array of items with product metadata for the chart
  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const product = products.find(p => p.id === id);
    return {
      id,
      name: product?.name || 'Unknown',
      category: product?.category || 'Uncategorized',
      price: product?.price || 0,
      quantity
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Filters</h2>
        <CategoryFilter category={category} onChange={setCategory} categories={categories} />
        <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        <div className="mt-4">
          <CartSummary cart={cart} products={products} onDecrement={decrementCart} onReset={resetCart} />
        </div>
      </aside>

      <section className="md:col-span-3">
        <StatusMessage status={status} items={filtered} />
        <ProductList
          products={filtered}
          onAdd={addToCart}
        />
      </section>
    </div>
  );
}
