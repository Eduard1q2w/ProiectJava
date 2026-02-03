"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthContextProvider>
            <CartProvider>{children}</CartProvider>
        </AuthContextProvider>
    );
}
