'use client';
import {Header} from '../../components/Header';
import { useAppSelector } from '../../store/hooks';

export default function CartPage() {
  const {cart} = useAppSelector(state => state);
  console.log(cart,'cart');
  
  const total = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div>
      {/* <Header /> */}
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>
        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.id} className="border p-4 rounded flex justify-between">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
                <div className="font-bold">${(item.quantity * item.price).toFixed(2)}</div>
              </div>
            ))}
            <div className="text-right font-bold text-xl mt-4">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
