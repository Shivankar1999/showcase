export default function ProductCard({ product }: { product: any }) {
    return (
        <div className="border p-4 rounded hover:shadow-lg flex flex-col items-center text-center">
        {/* Image Container with fixed height and overflow hidden */}
        <div className="relative w-full h-48 mb-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain" // Key classes: object-contain, w-full, h-full, absolute inset-0
          />
        </div>
  
        {/* Product Details */}
        <h2 className="text-lg font-bold mt-2 truncate w-full px-2">{product.title}</h2>
        <p className="text-sm mt-1">${product.price}</p>
        <p className="text-sm text-yellow-600">⭐ {product.rating?.rate ?? 'N/A'}</p>
        <a
          href={`/products/${product.id}`}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          View Details
        </a>
      </div> )
  }
  