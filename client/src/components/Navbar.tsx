"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { Menu, X, ShoppingCart, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { cart } = useContext(CartContext);
    const { user, dispatch } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Calculate total items in cart
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
    };

    // Prevent hydration mismatch by only rendering auth-dependent UI after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Despre", href: "/#about" },
        { name: "Meniu", href: "/menu" },
        { name: "Workshop-uri", href: "/#workshops" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-cream/80 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold font-heading text-primary">
                    MAZI Specialty Coffee
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-body uppercase tracking-wide text-secondary hover:text-brand-gold transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <Link href="/menu">
                        <Button size="sm" variant="primary">
                            Comandă
                        </Button>
                    </Link>
                    <Link href="/cart" className="relative">
                        <Button size="sm" variant="ghost" className="px-2">
                            <ShoppingCart size={20} />
                        </Button>
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                    {mounted && (
                        <>
                            {user ? (
                                <>
                                    {user.role === "admin" && (
                                        <Link href="/admin">
                                            <Button size="sm" variant="secondary">
                                                Admin
                                            </Button>
                                        </Link>
                                    )}
                                    <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-2">
                                        <LogOut size={16} />
                                        Ieși
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm" variant="outline">
                                        Intră în cont
                                    </Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-cream border-t border-brand-soft"
                >
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-primary font-body font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/menu" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full">Comandă</Button>
                        </Link>
                        <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="relative">
                            <Button variant="ghost" className="w-full justify-start">
                                Coș {cartItemsCount > 0 && `(${cartItemsCount})`}
                            </Button>
                        </Link>
                        {mounted && (
                            <>
                                {user ? (
                                    <>
                                        {user.role === "admin" && (
                                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                                                <Button variant="secondary" className="w-full">
                                                    Admin Panel
                                                </Button>
                                            </Link>
                                        )}
                                        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                                            <LogOut size={16} />
                                            Ieși din cont
                                        </Button>
                                    </>
                                ) : (
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            Intră în cont
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
