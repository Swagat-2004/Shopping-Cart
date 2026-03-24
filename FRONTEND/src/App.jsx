import { useEffect, useState } from "react";
import Cart from "./pages/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (productId) => {
    fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Added to cart:", data);
      })
      .catch((err) => console.log(err));
  };

  // 👉 If cart button clicked → show cart page
  if (showCart) {
    return <Cart />;
  }

  return (
    <div>
      {/* 👉 Go to Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="m-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Go to Cart
      </button>

      {/* 👉 Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {products.map((item) => (
          <div key={item._id} className="max-w-sm bg-white border rounded-lg shadow">
            <img
              className="rounded-t-lg"
              src={
                item.image ||
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              }
              alt=""
            />
            <div className="p-5">
              <h5 className="text-xl font-bold">{item.name}</h5>
              <p className="text-gray-700">₹{item.price}</p>
              <button
                onClick={() => addToCart(item._id)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;