import { useState, useEffect } from "react";
import StripePayment from "../../../components/StripePayment";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCartItems);
  }, []);

  // Update item quantity
  const handleQuantityChange = (bookId: number, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.book_id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new StorageEvent("storage", { key: "cartItems" }));
  };

  // Remove item from cart
  const handleRemoveItem = (bookId: number) => {
    const updatedItems = cartItems.filter((item) => item.book_id !== bookId);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new StorageEvent("storage", { key: "cartItems" }));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
  };

  return (
    <div>
      {/* breadcrumb */}
      <div className="container py-4 flex items-center gap-3">
        <a href="/" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Giỏ hàng</p>
      </div>
      {/* ./breadcrumb */}

      {/* wrapper */}
      <div className="container mx-auto pt-4 pb-16 flex justify-center">
        {/* shopping cart */}
        <div className="w-full max-w-4xl space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
              >
                <div className="w-28">
                  <img
                    src={item.book.image}
                    alt={item.book.title}
                    className="w-full object-cover rounded"
                  />
                </div>
                <div className="w-1/3">
                  <h2 className="text-gray-800 text-xl font-medium uppercase">
                    {item.book.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Availability: <span className="text-green-600">In Stock</span>
                  </p>
                </div>
                <div className="text-primary text-lg font-semibold">
                  ${item.book.price}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.book_id, parseInt(e.target.value, 10))
                    }
                    className="w-16 p-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.book_id)}
                    className="text-red-600 cursor-pointer hover:text-primary"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty. Start adding items!
            </p>
          )}

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div>
              <div className="flex justify-between p-4 border-t border-gray-200">
                <div className="text-lg font-semibold">Tổng tiền</div>
                <div className="text-xl font-bold text-primary">${calculateTotal()}</div>
              </div>
            </div>
          )}
        </div>
        {/* ./shopping cart */}

      </div>
      <StripePayment />
    </div>
  );
};

export default ShoppingCart;
