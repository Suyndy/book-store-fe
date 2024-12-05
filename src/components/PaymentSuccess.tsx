import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after success
import { message } from "antd";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a payment success
        const timer = setTimeout(() => {
            message.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!");
            // Optionally, redirect after a few seconds
            setTimeout(() => {
                navigate("/"); // Redirect to the orders page or another route
            }, 2000);
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                    Thanh toán thành công
                </h2>
                <div className="mt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
