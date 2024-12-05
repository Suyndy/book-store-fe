import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../core/config/api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// Load Stripe instance
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ clientSecret, orderId }: { clientSecret: string, orderId: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handlePaymentClick = async (id: string) => {
        try {
            await api.post("/payment/success", {
                stripe_payment_id: id,
                order_id: orderId
            })
            localStorage.removeItem("cartItems");
            message.success("Thanh toán thành công");
            window.dispatchEvent(new StorageEvent("storage", { key: "cartItems" }));
            navigate("/payment/success");
        } catch (err) {
            message.error("Thanh toán thất bại");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        // Confirm card payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });

        if (error) {
            setError(error.message || "Something went wrong");
            setProcessing(false);
            message.error("Thanh toán thất bại");
        } else if (paymentIntent) {
            setSuccess(true);
            setProcessing(false);
            handlePaymentClick(paymentIntent.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 px-[500px] pb-8">
            <CardElement className="p-4 border rounded" />
            {error && <div className="text-red-500">{error}</div>}
            <div className="w-full text-center">
                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className="bg-red-500 text-white px-10 py-3 rounded disabled:bg-gray-400"
                >
                    {processing ? "Đang xử lý..." : "Thanh toán"}
                </button>
            </div>
            {success && <div className="text-green-500">Payment successful!</div>}
        </form>
    );
};

const StripePayment = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<number>(0);
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        // Load cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(storedCartItems);
    }, []);

    const handlePaymentClick = async () => {
        try {
            const response = await api.post("/checkout", {
                cartItems: cartItems
            })
            const data = response.data;
            setClientSecret(data.client_secret);
            setOrderId(data.order_id);
        } catch (err) {
            console.error("Error creating payment intent:", err);
        }
    };

    return (
        <div>
            {!clientSecret ? (
                <div className="w-full m-auto text-center pb-8">
                    <button
                        onClick={handlePaymentClick}
                        className="bg-red-500 m-auto text-white px-8 py-4 rounded"
                    >
                        Thanh toán
                    </button>
                </div>
            )
                :
                (<Elements stripe={stripePromise}>
                    <PaymentForm clientSecret={clientSecret} orderId={orderId} />
                </Elements>)
            }
        </div>
    );
};

export default StripePayment;
