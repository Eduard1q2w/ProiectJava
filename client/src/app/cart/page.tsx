"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { cart, removeFromCart, total, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-heading font-bold text-primary mb-4">Coșul tău este gol</h1>
                <p className="text-secondary mb-8">Nu ai adăugat încă nimic bun aici.</p>
                <Link href="/menu">
                    <Button>Vezi Meniul</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold text-primary mb-8">Coșul Meu</h1>

            <div className="bg-paper rounded-2xl shadow-lg p-6 mb-8">
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center justify-between border-b border-stone-100 pb-6 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-xs text-stone-400">
                                    {/* Valid image would go here */}
                                    IMG
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-lg">{item.name}</h3>
                                    <p className="text-secondary text-sm">Quantitate: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="font-mono font-bold text-lg">{item.price * item.quantity} RON</span>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-stone-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-brand-soft/30 p-8 rounded-2xl border border-brand-soft">
                <div className="text-center md:text-left">
                    <p className="text-secondary mb-1">Total de plată</p>
                    <p className="text-4xl font-mono font-bold text-primary">{total} <span className="text-lg">RON</span></p>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" onClick={clearCart}>Golește</Button>
                    <Button size="lg" className="px-12">Finalizează Comanda</Button>
                </div>
            </div>
        </div>
    );
}
