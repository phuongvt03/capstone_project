"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sidebar_items } from "@/constant/user";
import { LogOutIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    if (auth.user === null) {
      router.push("/");
    }
  }, [auth, router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    auth
      .logout()
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        auth.resetState();
      });
  };

  // Sidebar classes for smooth slide in/out
  const sidebarBase =
    "fixed left-0 top-0 h-full bg-white shadow-lg flex flex-col z-40 transition-transform transition-opacity duration-300";
  const sidebarDesktop = "w-64 translate-x-0 opacity-100";
  const sidebarMobileOpen = "w-full max-w-xs translate-x-0 opacity-100";
  const sidebarMobileClosed = "w-full max-w-xs -translate-x-full opacity-0 pointer-events-none";

  return (
    <div className="min-h-screen w-full font-be-vietnam-pro flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
        aria-label="Mở menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          sidebarBase,
          isMobile
            ? open
              ? sidebarMobileOpen
              : sidebarMobileClosed
            : sidebarDesktop
        )}
        style={{ width: isMobile ? undefined : 256 }}
      >
        {/* Logo & Toggle (desktop click logo to collapse if needed) */}
        <div
          className="h-[80px] flex items-center justify-center cursor-pointer"
          onClick={() => !isMobile && setOpen((o) => !o)}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-[90px] h-[90px] object-cover"
          />
        </div>

        {/* Menu Items */}
        <div className="mt-4 flex flex-col gap-2 flex-1 overflow-y-auto">
          {sidebar_items.map((item, index) => {
            if (auth.role === "staff" && item.href === "/setting") {
              return null;
            }
            const isActive = pathname === item.href;
            return (
              <div
                key={index}
                onClick={() => {
                  router.push(item.href);
                  if (isMobile) setOpen(false);
                }}
                className={cn(
                  "relative flex items-center px-4 py-3 cursor-pointer transition-all",
                  "gap-x-10 pl-[40px]",
                  isActive
                    ? "text-blue-500 bg-blue-100 rounded-lg"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-6 h-6 shrink-0" />
                <span className="text-[15px] leading-[1.8] truncate">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-blue-500 rounded-[13px]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Menu (Logout) */}
        <div className="border-t border-gray-300 w-full flex flex-col gap-y-3 py-3">
          <div
            className={cn(
              "relative flex items-center gap-5 py-3 px-4 cursor-pointer transition-all justify-start pl-8 text-gray-700 hover:bg-gray-100"
            )}
            onClick={handleLogout}
          >
            <LogOutIcon className="w-6 h-6" />
            <span className="text-[15px]">Đăng xuất</span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 py-6 px-4 transition-all duration-300 font-be-vietnam-pro",
          !isMobile && "pl-4",
          isMobile ? "w-full" : "ml-64"
        )}
        style={!isMobile ? { marginLeft: 256 } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
