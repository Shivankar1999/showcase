'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../services/api';
import { useAppDispatch ,useAppSelector} from '../../../store/hooks';
import { addToCart } from '../../../store/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const  state = useAppSelector(state => state);
  const router   =  useRouter()
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
console.log(state,'state');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      }));
      window.alert(`Added ${product.title} to cart!`);
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-pulse flex flex-col md:flex-row bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
          <div className="w-full md:w-1/3 h-64 bg-gray-200 rounded-lg flex-shrink-0 mb-6 md:mb-0 md:mr-8"></div>
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-6 text-xl text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-160px)] p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 lg:p-12 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/CCCCCC/666666?text=Image+Load+Error'; }}
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {product.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Key Features:</h2>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
            Price: ${product.price.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
