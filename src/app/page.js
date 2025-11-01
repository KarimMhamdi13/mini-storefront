// src/app/page.jsx
import Catalog from './components/Catalog';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Mini Storefront</h1>
          <p className="text-sm text-gray-600">Browse products, filter, and manage a cart — demo app</p>
        </header>

        {/* Catalog is a client component which fetches and manages states */}
        <Catalog />
      </div>
    </main>
  );
}
