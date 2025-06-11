'use client';
import ProfileDashboardMenu from "@/components/profile_dashboard_menu";
import { motion } from "framer-motion";
import { BellIcon } from "lucide-react";


export default function SettingHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between p-4 rounded-lg"
        >
            <div className="flex items-center gap-x-4">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800">Chỉnh sửa thông số</h2>
                    <p className="mt-4 text-gray-500 text-sm w-[80%] leading-[1.8]">
                        Trang cài đặt cho phép bạn tùy chỉnh các thông số vận hành của hệ thống theo thời gian thực,
                        đảm bảo mọi thành phần hoạt động chính xác và phù hợp với nhu cầu sử dụng.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="z-10 flex items-center gap-x-8"
            >
                <ProfileDashboardMenu profile={123} />
            </motion.div>
        </motion.div>
    )
}
