import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import api from "../../../core/config/api";
import { message } from "antd";
const ProductDetail = () => {
  const location = useLocation();

  // Lấy đoạn cuối của pathname
  const pathSegments = location.pathname.split("/"); // Tách URL thành mảng dựa trên dấu `/`
  const lastSegment = pathSegments[pathSegments.length - 1]; // Lấy phần cuối cùng
  console.log(lastSegment);

  const { data } = useQuery({
    queryKey: ["detail", lastSegment],
    queryFn: async () => {
      const res = await api.get(`/books/${lastSegment}`);
      return res.data;
    },
  });

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Check if the book is already in the cart
    const existingItem = cartItems.find(
      (cartItem: any) => cartItem.book_id === data.id
    );

    if (existingItem) {
      // If the book is already in the cart, increment the quantity
      existingItem.quantity += 1;
    } else {
      // If the book is not in the cart, add it with quantity = 1
      cartItems.push({
        book: data,
        book_id: data.id,
        quantity: 1,
      });
    }

    // Save the updated cart to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    message.success("Thêm vào giỏ hàn thành công!");
    window.dispatchEvent(new StorageEvent("storage", { key: "cartItems" }));
  };

  return (
    <div className="mb-16">
      {/* breadcrumb */}
      <div className="container py-4 flex items-center gap-3 mt-[150px]">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Product</p>
      </div>
      {/* product-detail */}
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img src={data?.image} alt="product" className="w-full" />
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">{data?.title}</h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  <i className="fa-solid fa-star" />
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500 ml-3"></div>
          </div>
          <div className="space-y-2">
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Tác giả: </span>
              <span className="text-gray-600">{data?.author}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              {Number(data?.price).toLocaleString()} VND
            </p>
          </div>

          <p className="mt-4 text-gray-600">{data?.description}</p>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
            >
              <i className="fa-solid fa-bag-shopping" /> Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
