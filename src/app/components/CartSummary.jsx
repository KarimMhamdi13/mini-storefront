'use client';
import React, { useMemo } from 'react';

export default function CartSummary({ cart, products, onDecrement, onReset }) {
  const items = Object.keys(cart).map(id => {
    const prod = products.find(p => p.id === id);
    return prod ? { ...prod, qty: cart[id] } : null;
  }).filter(Boolean);

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  return (
    <div className="bg-gray-50 p-3 rounded border">
      <h3 className="font-semibold">Cart Summary</h3>
      <p className="text-sm text-gray-600">Items: {items.reduce((s, it) => s + it.qty, 0)}</p>
      <p className="text-sm text-gray-600">Total: ${total.toFixed(2)}</p>

      <div className="mt-3 space-y-2">
        {items.map(it => (
          <div key={it.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">qty: {it.qty}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onDecrement(it.id)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={onReset} className="flex-1 px-3 py-2 bg-red-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
}
