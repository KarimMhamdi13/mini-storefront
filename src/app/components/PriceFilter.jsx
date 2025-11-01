'use client';
import React from 'react';

export default function PriceFilter({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Max Price</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="No limit"
        className="mt-1 block w-full border rounded p-2"
      />
    </div>
  );
}
