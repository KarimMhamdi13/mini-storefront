"use client";

import { useState } from "react";
import Catalog from "./components/Catalog";
import SalesChart from "./components/SalesChart";

export default function Page() {
  // MOVE CART HERE (shared state)
  const [cart, setCart] = useState({}); // { id: qty }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* TOP CHART */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Sales Overview</h2>
          <SalesChart cart={cart} />
        </section>

        {/* Storefront */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Mini Storefront</h1>
          <p className="text-sm text-gray-600">
            Browse products, filter, and manage a cart — demo app
          </p>
        </header>

        <Catalog cart={cart} setCart={setCart} />
      </div>
    </main>
  );
}
