import  { useEffect, useState } from 'react';
import { useRequests } from '../providers/RequestsContext';

export default function ProductList() { //we can create hook to fetch products and use it in other components if needed then
  const [products, setProducts] = useState([]);
  const { api } = useRequests();

  useEffect(() => {
    ;(async function () {
        const res = await api('/products')
        setProducts(res?.data);
    })()
  }, []);

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
