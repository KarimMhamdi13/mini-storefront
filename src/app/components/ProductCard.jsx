'use client';
import React from 'react';

export default function ProductCard({ product, onAdd }) {
  const out = product.stock <= 0;
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
        <p className="mt-2 text-xs">{out ? <span className="text-red-600">Out of stock</span> : `In stock: ${product.stock}`}</p>
      </div>

      <div className="mt-4">
        <button
          onClick={onAdd}
          disabled={out}
          className={`w-full px-3 py-2 rounded ${out ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
