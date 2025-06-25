'use client';
import {Header} from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import SortBar from '../components/SortBar';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProducts } from '../store/productSlice';
import { api } from '../services/api';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/products');
      dispatch(setProducts(res.data));
    };
    fetchData();
  }, [dispatch]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row p-4">
        <FilterSidebar />
        <div className="flex-1">
          <SortBar />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}