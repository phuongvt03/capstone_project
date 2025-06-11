'use client';

import AuthCarousel from "@/components/auth_carousel";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            window.location.href = "/monitor";
        }
    }, [user]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-screen py-4 px-4 sm:py-[10px] sm:px-[10px]"
        >
            {/* Bên trái */}
            <motion.section
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-between bg-white px-4 sm:px-6"
            >
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute top-4 sm:top-6 left-4 sm:left-6"
                >
                    <img 
                        src="/images/logo1.png" 
                        alt="Logo" 
                        className="w-[280px] sm:w-[400px] md:w-[520px] h-auto object-contain" 
                    />
                </motion.div>

                {/* Nội dung chính */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex-grow flex items-center justify-start mt-24 sm:mt-32"
                >
                    <div className="w-full max-w-[600px]">{children}</div>
                </motion.div>
            </motion.section>

            {/* Bên phải */}
            <motion.section
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden md:flex md:w-[50%] lg:w-[50%] xl:w-[50%] relative rounded-xl overflow-hidden"
            >
                <AuthCarousel />
            </motion.section>
        </motion.div>
    );
}
