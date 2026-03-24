import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart data:", data);

        // ✅ Fix: always make it array
        if (Array.isArray(data)) {
          setCart(data);
        } else if (Array.isArray(data.cart)) {
          setCart(data.cart);
        } else {
          setCart([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Cart Page</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="border p-3 mb-2 rounded">
            <h2>{item.product?.name}</h2>
            <p>Price: ₹{item.product?.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;