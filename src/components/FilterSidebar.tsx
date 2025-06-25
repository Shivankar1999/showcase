'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setProducts } from '../store/productSlice';
import { api } from '../services/api';

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        const res = await api.get('/products');
        let filtered = res.data;
        if (category) {
          filtered = filtered.filter((p: any) => p.category === category);
        }
        filtered = filtered.filter((p: any) => p.price <= maxPrice);
        dispatch(setProducts(filtered));
      } catch (error) {
        console.error('Filtering failed:', error);
      }
    };
    fetchFiltered();
  }, [category, maxPrice, dispatch]);

  return (
    <aside className="w-full md:w-60 p-4 mb-4 md:mb-0">
      <h3 className="font-semibold mb-2">Filters</h3>
      <div>
        <label className="block mb-1">Category</label>
        <select
          className="w-full border p-1 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block mb-1">Price Range (Up to ${maxPrice})</label>
        <input
          type="range"
          min="10"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </aside>
  );
}
