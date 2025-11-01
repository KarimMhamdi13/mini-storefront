export async function GET() {
  const products = [
    { id: 'p1', name: 'Laptop', price: 1200, category: 'Electronics', stock: 5 },
    { id: 'p2', name: 'Desk Chair', price: 150, category: 'Furniture', stock: 3 },
    { id: 'p3', name: 'Phone', price: 900, category: 'Electronics', stock: 4 },
    { id: 'p4', name: 'Coffee Mug', price: 12, category: 'Kitchen', stock: 25 },
    { id: 'p5', name: 'Desk Lamp', price: 45, category: 'Home', stock: 8 },
    { id: 'p6', name: 'Bluetooth Speaker', price: 85, category: 'Electronics', stock: 6 },
    { id: 'p7', name: 'Bookshelf', price: 220, category: 'Furniture', stock: 2 },
    { id: 'p8', name: 'Throw Pillow', price: 30, category: 'Home', stock: 10 },
    { id: 'p9', name: 'Cutting Board', price: 28, category: 'Kitchen', stock: 12 },
    { id: 'p10', name: 'Notebook', price: 6, category: 'Office', stock: 40 }
  ];

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
