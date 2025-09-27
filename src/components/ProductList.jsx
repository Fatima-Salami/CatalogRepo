import  { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await api.get('/products');
        if (!cancelled) setProducts(res.data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          <strong>{p.name}</strong> — {p.category} — ${p.price}
        </li>
      ))}
    </ul>
  );
}
