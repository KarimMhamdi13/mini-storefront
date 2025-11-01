'use client';
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onAdd }) {
  if (!products) return null;
  if (products.length === 0) {
    return <div className="p-6 text-center text-gray-500">No products match your filters.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={() => onAdd(product.id)} />
      ))}
    </div>
  );
}
