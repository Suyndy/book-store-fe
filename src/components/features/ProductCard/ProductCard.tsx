import { useNavigate } from "react-router-dom";
import { message } from "antd";

const CartProduct = ({ item }: any) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Check if the book is already in the cart
    const existingItem = cartItems.find((cartItem: any) => cartItem.book_id === item.id);

    if (existingItem) {
      // If the book is already in the cart, increment the quantity
      existingItem.quantity += 1;
    } else {
      // If the book is not in the cart, add it with quantity = 1
      cartItems.push({
        book: item,
        book_id: item.id,
        quantity: 1,
      });
    }

    // Save the updated cart to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    message.success("Thêm vào giỏ hàn thành công!");
    window.dispatchEvent(new StorageEvent("storage", { key: "cartItems" }));
  };

  return (
    <div
      className="bg-white shadow rounded overflow-hidden group"
    >

      <div onClick={() => navigate(`/shop/${item?.id}`)}>
        <div className="relative">
          <img
            src={`${item?.image}`}
            alt={`product${item?.id}`}
            className="w-full h-[250px] object-contain"
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
          >
            <a
              href="#"
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              title="view product"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <a
              href="#"
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              title="add to wishlist"
            >
              <i className="fa-solid fa-heart"></i>
            </a>
          </div>
        </div>
        <div className="pt-4 pb-3 px-4">
          <a href="#">
            <h4 className="uppercase font-medium text-x mb-2 text-gray-800 hover:text-primary transition">
              {item?.title}
            </h4>
            <h6>{item?.author}</h6>
          </a>
          <div className="flex items-baseline mb-1 space-x-2">
            <p className="text-xl text-primary font-semibold">
              {item?.price} VND
            </p>
            {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card click event
          handleAddToCart();
        }}
        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default CartProduct;
