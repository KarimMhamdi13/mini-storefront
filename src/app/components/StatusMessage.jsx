'use client';
import React from 'react';

export default function StatusMessage({ status, items }) {
  if (status.loading) {
    return <div className="mb-4 p-4 bg-blue-50 rounded text-blue-800">Loading products...</div>;
  }
  if (status.error) {
    return <div className="mb-4 p-4 bg-red-50 rounded text-red-800">Error: {status.error}</div>;
  }
  if (!items || items.length === 0) {
    return <div className="mb-4 p-4 bg-yellow-50 rounded text-yellow-800">No products found.</div>;
  }
  return null;
}
