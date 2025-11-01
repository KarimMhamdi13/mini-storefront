'use client';
import React from 'react';

export default function CategoryFilter({ category, onChange, categories }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Category</label>
      <select
        value={category}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border rounded p-2"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
