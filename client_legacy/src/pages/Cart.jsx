import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, clearCart, total } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/orders", {
                userId: user.id,
                products: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                    priceAtPurchase: item.price
                })),
                totalAmount: total,
                status: 'Pending'
            }, {
                headers: { token: `Bearer ${token}` }
            });
            clearCart();
            navigate('/profile');
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-amber-900">Coșul Tău</h1>

            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-stone-500 mb-4">Coșul tău este gol.</p>
                    <Link to="/menu" className="text-amber-600 font-bold hover:underline">Mergi la Meniu</Link>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-grow bg-white rounded-lg shadow-lg overflow-hidden">
                        {cart.map((item) => (
                            <div key={item._id} className="flex items-center p-4 border-b last:border-b-0">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-stone-600">{item.price} RON x {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg mb-2">{item.price * item.quantity} RON</p>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                                    >
                                        Elimină
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full md:w-80">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Sumar Comandă</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{total} RON</span>
                            </div>
                            <div className="flex justify-between mb-4 font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>{total} RON</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded transition disabled:bg-amber-400"
                                disabled={loading}
                            >
                                {loading ? "Se procesează..." : "Finalizează Comanda"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
