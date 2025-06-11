"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const NAVBARS = [
        { title: "Trang chủ", link: "/" },
        { title: "Về chúng tôi", link: "/about" },
    ];
    const renderNavbars = () => {
        return NAVBARS.map((nav, idx) => {
            return <Link
                href={nav.link}
                key={idx}
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
                <span>
                    {nav.title}
                </span>
            </Link>
        })
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-4">
                <h1
                    className="text-xl font-bold text-blue-600 cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    PCCC
                </h1>
                <div className="flex items-center gap-6">
                    {renderNavbars()}
                </div>


                <nav className="flex items-center gap-4">
                    <div>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <LogIn className="w-4 h-4" />
                            <span className="text-sm font-medium">Đăng nhập</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}