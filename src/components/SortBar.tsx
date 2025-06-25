'use client';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setProducts } from '../store/productSlice';
import { api } from '../services/api';

export default function SortBar() {
  const dispatch = useAppDispatch();
  const [sortKey, setSortKey] = useState('');

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSortKey(key);
    try {
      const res = await api.get('/products');
      let sorted = res.data;
      if (key === 'price') sorted.sort((a, b) => a.price - b.price);
      else if (key === 'rating') sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      else if (key === 'name') sorted.sort((a, b) => a.title.localeCompare(b.title));
      dispatch(setProducts(sorted));
    } catch (err) {
      console.error('Sorting failed:', err);
    }
  };

  return (
    <div className="mb-4 flex justify-end">
      <select
        value={sortKey}
        onChange={handleSortChange}
        className="border p-1 rounded"
      >
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
