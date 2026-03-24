import { useEffect, useState } from "react";

const Cart = ({ goBack }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://shopping-cart-production-0271.up.railway.app/api/cart")
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

  const removeItem = (id) => {
    fetch(`https://shopping-cart-production-0271.up.railway.app/api/cart/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setCart(cart.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;

    fetch(`https://shopping-cart-production-0271.up.railway.app/api/cart/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQty }),
    })
      .then((res) => res.json())
      .then(() => {
        setCart(
          cart.map((item) =>
            item._id === id ? { ...item, quantity: newQty } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-5">
      <button onClick={goBack}>
        Back to Products
      </button>
      <h1 className="text-2xl font-bold mb-4">Cart Page</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="border p-3 mb-2 rounded">
            <h2>{item.product?.name}</h2>
            <p>Price: ₹{item.product?.price}</p>
            <div>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                -
              </button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                +
              </button>
            </div>

            <button onClick={() => removeItem(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;