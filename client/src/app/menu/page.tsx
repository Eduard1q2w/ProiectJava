"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CartContext } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import { ShoppingCart, Plus } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

const TABS = [
    { id: "coffee", label: "CAFEA", categories: ["Coffee"] },
    { id: "non-coffee", label: "FĂRĂ CAFEA", categories: ["Non-Coffee"] },
    { id: "cold", label: "RECE", categories: ["Cold"] },
    { id: "food", label: "MÂNCARE", categories: ["Food", "Pastry"] },
];

export default function MenuPage() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
                // Fallback mock data if API fails (for demo purposes)
                setProducts([
                    { _id: '1', name: 'Espresso', price: 9, category: 'Coffee', description: 'Simplu și intens' },
                    { _id: '2', name: 'Cappuccino', price: 14, category: 'Coffee', description: 'Cremozitate perfectă' },
                    { _id: '3', name: 'Flat White', price: 16, category: 'Coffee', description: 'Double shot și lapte fin' },
                    { _id: '4', name: 'Matcha Latte', price: 18, category: 'Non-Coffee', description: 'Ceremonial grade' },
                    { _id: '5', name: 'Cold Brew High', price: 20, category: 'Cold', description: 'Infuzat 12 ore' },
                    { _id: '6', name: 'Croissant cu Unt', price: 10, category: 'Pastry', description: 'Proaspăt copt' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const currentTab = TABS.find((t) => t.id === activeTab);
    const filteredProducts = products.filter((p) =>
        currentTab?.categories.includes(p.category)
    );

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold font-heading text-primary mb-4">Meniul Nostru</h1>
                <p className="text-secondary max-w-xl mx-auto">
                    Preparate cu grijă, servite cu drag. Răsfață-te cu selecția noastră de specialități.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-brand-soft/50 pb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "text-sm font-bold tracking-widest relative pb-4 transition-colors duration-300",
                            activeTab === tab.id
                                ? "text-primary"
                                : "text-secondary/60 hover:text-primary"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="max-w-3xl mx-auto space-y-8">
                {loading ? (
                    <div className="text-center py-12 text-secondary">Se încarcă meniul...</div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="group"
                        >
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                                <div className="flex-1">
                                    <div className="flex items-baseline overflow-hidden relative">
                                        <span className="font-heading font-bold text-xl text-primary flex-shrink-0 pr-4 bg-cream z-10">
                                            {product.name}
                                        </span>
                                        <div className="w-full h-px border-b-2 border-dotted border-brand-soft/80 absolute bottom-1.5" />
                                    </div>
                                    <p className="text-sm text-secondary mt-1">{product.description}</p>
                                </div>
                                <span className="font-mono text-lg font-bold text-brand-gold flex-shrink-0 pl-2 bg-cream z-10">
                                    {product.price} <span className="text-xs text-stone-400 font-sans font-normal">RON</span>
                                </span>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => addToCart(product)}
                                    className="gap-2"
                                >
                                    <Plus size={16} />
                                    Adaugă în Coș
                                </Button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 text-secondary italic">
                        Nu există produse în această categorie momentan.
                    </div>
                )}
            </div>
        </div>
    );
}
