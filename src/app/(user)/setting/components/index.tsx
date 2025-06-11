'use client';

import SettingHeader from "@/app/(user)/setting/components/setting-header";
import { useEffect, useState } from "react";
import SettingBasic from "@/app/(user)/setting/components/setting-basic";
import SettingPID from "@/app/(user)/setting/components/setting-pid";
import { useAuth } from "@/context/auth-context";


export default function SettingComponent() {
    const [activeTab, setActiveTab] = useState<"setting_basic" | "setting_pid">("setting_basic");

    const auth = useAuth();

    useEffect(() => {
        if (auth?.role === "staff") {
            window.location.href = "/monitor";
        }
    }, []);

    return (
        <div>
            <SettingHeader />
            <div className="p-4">
                <div className="flex items-center gap-4 mt-4">
                    <button
                        className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "setting_basic" ? "bg-blue-600 text-white" : "border hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("setting_basic")}
                    >
                        Bảng cài đặt cơ bản
                    </button>
                    <button
                        className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "setting_pid" ? "bg-blue-600 text-white" : "border hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("setting_pid")}
                    >
                        Bảng cài đặt thông số PID
                    </button>
                </div>
                <div className="my-6">
                    {activeTab === "setting_basic" ? <SettingBasic /> : <SettingPID />}
                </div>
            </div>
        </div>
    )
}
