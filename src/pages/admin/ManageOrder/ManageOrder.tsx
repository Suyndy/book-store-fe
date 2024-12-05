import { useEffect, useState } from "react";
import { orderService } from "../../../core/services/oder.service";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Fetch orders from the API on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await orderService.getAllOrder("");
                setOrders(response.data); // Assuming response.data contains the list of orders
            } catch (err) {
                setError("Failed to fetch orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Format the date
    function formatDate(isoString: string) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const handleViewDetail = (id: number) => {
        navigate(`/admin/order/${id}`);
    };


    return (
        <div className="bg-gray-100 py-10 px-5">
            <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-5">
                    <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 border-b">ID</th>
                                <th className="px-4 py-2 border-b">Total Price</th>
                                <th className="px-4 py-2 border-b">User ID</th>
                                <th className="px-4 py-2 border-b">Phone</th>
                                <th className="px-4 py-2 border-b">Status</th>
                                <th className="px-4 py-2 border-b">Address</th>
                                <th className="px-4 py-2 border-b">Created At</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr className="bg-white" key={order.id}>
                                    <td className="px-4 py-2 border-b text-center">{order.id}</td>
                                    <td className="px-4 py-2 border-b text-center">${order.total_price}</td>
                                    <td className="px-4 py-2 border-b text-center">{order.user_id}</td>
                                    <td className="px-4 py-2 border-b text-center">{order.phone || "N/A"}</td>
                                    <td className="px-4 py-2 border-b text-center">{order.status}</td>
                                    <td className="px-4 py-2 border-b text-center">{order.address || "N/A"}</td>
                                    <td className="px-4 py-2 border-b text-center">{formatDate(order.created_at)}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            onClick={() => handleViewDetail(order.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            View Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
