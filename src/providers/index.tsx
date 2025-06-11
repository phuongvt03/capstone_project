'use client';

import { Backdrop } from "@/components/backdrop";
import { AuthProvider } from "@/context/auth-context";
import { BackdropProvider } from "@/context/backdrop_context";
import { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
    return (
        <AuthProvider>
            <BackdropProvider>
                <Backdrop />
                {children}
            </BackdropProvider>
        </AuthProvider>
    );
}