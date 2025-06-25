'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProducts } from '../../store/productSlice';
import { api } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import FilterSidebar from '../../components/FilterSidebar';
import SortBar from '../../components/SortBar';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.products);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/products');
      dispatch(setProducts(res.data));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row p-4">
      <FilterSidebar />
      <div className="flex-1">
        <SortBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
