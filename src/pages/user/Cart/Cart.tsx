const Cart = () => {
  return (
    <div>
      {/* breadcrumb */}
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
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
          {/* Cart Item 1 */}
          <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
              <img
                src="../assets/images/products/product6.jpg"
                alt="product 6"
                className="w-full"
              />
            </div>
            <div className="w-1/3">
              <h2 className="text-gray-800 text-xl font-medium uppercase">
                Italian L shape
              </h2>
              <p className="text-gray-500 text-sm">
                Availability: <span className="text-green-600">In Stock</span>
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">$320.00</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value="1"
                min="1"
                className="w-16 p-1 border border-gray-300 rounded"
              />
              <button className="text-red-600 cursor-pointer hover:text-primary">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          {/* Cart Item 2 */}
          <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
              <img
                src="../assets/images/products/product5.jpg"
                alt="product 5"
                className="w-full"
              />
            </div>
            <div className="w-1/3">
              <h2 className="text-gray-800 text-xl font-medium uppercase">
                Dining Table
              </h2>
              <p className="text-gray-500 text-sm">
                Availability: <span className="text-green-600">In Stock</span>
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">$320.00</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value="1"
                min="1"
                className="w-16 p-1 border border-gray-300 rounded"
              />
              <button className="text-red-600 cursor-pointer hover:text-primary">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="flex justify-between p-4 border-t border-gray-200">
            <div className="text-lg font-semibold">Tổng tiền</div>
            <div className="text-xl font-bold text-primary">$640.00</div>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-center">
            <a
              href="#"
              className="px-8 py-3 text-white bg-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-medium"
            >
              Thanh toán
            </a>
          </div>
        </div>
        {/* ./shopping cart */}
      </div>
      {/* ./wrapper */}
    </div>
  );
};

export default Cart;
