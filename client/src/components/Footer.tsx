import Link from "next/link";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-cream py-16" id="contact">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-heading font-bold mb-4">MAZI</h3>
                    <p className="text-brand-soft text-sm leading-relaxed mb-6">
                        Un loc unde cafeaua devine poveste și fiecare ceașcă aduce oamenii împreună.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-brand-gold transition-colors"><Instagram size={20} /></Link>
                        <Link href="#" className="hover:text-brand-gold transition-colors"><Facebook size={20} /></Link>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-lg font-heading font-bold mb-4">Navigare</h4>
                    <ul className="space-y-2 text-sm text-brand-soft">
                        <li><Link href="/" className="hover:text-brand-gold">Acasă</Link></li>
                        <li><Link href="/menu" className="hover:text-brand-gold">Meniu</Link></li>
                        <li><Link href="/#workshops" className="hover:text-brand-gold">Workshop-uri</Link></li>
                        <li><Link href="/admin" className="hover:text-brand-gold">Admin</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-heading font-bold mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm text-brand-soft">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="mt-1 text-brand-gold" />
                            <span>Pallady, Sector 3<br />Moinesti, România</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-brand-gold" />
                            <span>+40 700 000 000</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-brand-gold" />
                            <span>contact@mazi.coffee</span>
                        </li>
                    </ul>
                </div>

                {/* Hours */}
                <div>
                    <h4 className="text-lg font-heading font-bold mb-4">Program</h4>
                    <ul className="space-y-2 text-sm text-brand-soft">
                        <li className="flex justify-between"><span>Luni - Vineri</span> <span>07:30 - 18:00</span></li>
                        <li className="flex justify-between"><span>Sâmbătă</span> <span>09:00 - 19:00</span></li>
                        <li className="flex justify-between"><span>Duminică</span> <span>09:00 - 19:00</span></li>
                    </ul>
                </div>

            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-brand-soft/50">
                © 2026 MAZI Specialty Coffee. All rights reserved.
            </div>
        </footer>
    );
}
