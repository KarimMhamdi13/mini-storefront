"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ cart = {} }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch product list so we can join cart → price & category
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoadingProducts(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        if (!mounted) return;
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products for chart:", err);
        setProducts([]);
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Defensive: make a set of possible id types for matching
  function findProductById(id) {
    if (!products || products.length === 0) return undefined;

    // try exact match
    let p = products.find(px => px.id === id);
    if (p) return p;

    // try string/number conversions
    const idNum = Number(id);
    if (!Number.isNaN(idNum)) {
      p = products.find(px => Number(px.id) === idNum);
      if (p) return p;
    }

    const idStr = String(id);
    p = products.find(px => String(px.id) === idStr);
    return p;
  }

  // Convert cart object { id: qty } → array with product details
  const cartItems = Object.keys(cart).map(key => {
    const qty = cart[key];
    // ignore zero or falsy qty
    if (!qty || qty <= 0) return null;

    const product = findProductById(key);
    if (!product) return null;

    return {
      id: product.id,
      category: product.category || "Uncategorized",
      price: typeof product.price === "number" ? product.price : Number(product.price) || 0,
      quantity: qty
    };
  }).filter(Boolean);

  // Helpful debug output (console only)
  useEffect(() => {
    // console logs help debug in the browser devtools
    console.debug("SalesChart - cart prop:", cart);
    console.debug("SalesChart - products loaded:", products.length, "cartItems:", cartItems.length);
  }, [cart, products]);

  if (loadingProducts) {
    return (
      <div className="p-4 text-gray-600">
        <p>Loading chart data…</p>
      </div>
    );
  }

  // If nothing in cart → show message
  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        <p>No sales yet — add items to the cart to see revenue data.</p>
      </div>
    );
  }

  // Build revenue totals by category
  const categoryTotals = {};
  cartItems.forEach((item) => {
    const revenue = item.price * item.quantity;
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + revenue;
  });

  // Convert to chart-friendly array (sort for deterministic display)
  const chartData = Object.keys(categoryTotals)
    .sort()
    .map((category) => ({
      category,
      revenue: Number(categoryTotals[category].toFixed(2)),
    }));

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <h2 className="text-xl font-bold mb-3">Revenue by Category</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="revenue" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
