import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access the URL params
import { orderService } from "../../../core/services/oder.service";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { id } = useParams<{ id: string }>(); // Get the order ID from the URL
  const [orderDetails, setOrderDetails] = useState<any | null>(null); // State to store the order detail data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch the order details when the component mounts or the `id` changes
  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null); // Reset error on each fetch attempt
      try {
        const response = await orderService.getOneOrder(Number(id)); // Assuming getOrderDetail takes the order ID as a parameter
        setOrderDetails(response.data); // Assuming response.data contains the order detail
      } catch (err) {
        setError("Failed to fetch order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id]); // Re-run the effect whenever the `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!orderDetails) {
    return <div>Không tìm thấy sản phẩm nào!!</div>;
  }


  const handleBack = () => {
    navigate("/admin/order"); // Navigate back to the /admin/order page
  };

  return (
    <div className="bg-gray-100 py-10 px-5">
      <button
        onClick={handleBack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-6"
      >
        Back to Orders
      </button>
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-6">Chi tiết hóa đơn</h2>

        {/* Loop through each order item */}
        {orderDetails.map((orderDetail: any) => {
          const {
            order_id,
            quantity,
            price,
            book: { isbn, title, author, price: bookPrice, description, image },
          } = orderDetail;

          return (
            <div key={order_id} className="mb-8 bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Book Information</h3>
              <div className="flex flex-row md:flex-row items-center gap-x-12">
                <img
                  src={`${image}`} // Assuming the images are stored in a public folder
                  alt={title}
                  className="w-32 h-48 object-contain rounded-md mb-4 md:mb-0"
                />
                <div className="ml-0 md:ml-6 mt-4 md:mt-0">
                  <p className="text-lg text-gray-600"><strong>ISBN:</strong> {isbn}</p>
                  <p className="text-lg text-gray-600"><strong>Title:</strong> {title}</p>
                  <p className="text-lg text-gray-600"><strong>Author:</strong> {author}</p>
                  <p className="text-lg text-gray-600"><strong>Price:</strong> ${bookPrice}</p>
                  <p className="text-lg text-gray-600"><strong>Description:</strong> {description}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Order Information</h3>
                  <p className="text-lg text-gray-600"><strong>Quantity:</strong> {quantity}</p>
                  <p className="text-lg text-gray-600"><strong>Price:</strong> ${price}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetail;
