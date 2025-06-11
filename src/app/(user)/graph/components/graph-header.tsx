'use client';
import ProfileDashboardMenu from "@/components/profile_dashboard_menu";
import { motion } from "framer-motion";
import { BellIcon } from "lucide-react";


export default function GraphHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between p-4 rounded-lg"
        >
            <div className="flex items-center gap-x-4">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Màn hình đồ thị
                    </h2>
                    <p className="mt-4 text-gray-500 text-sm w-[80%] leading-[1.8]">
                        Màn hình đồ thị cung cấp cái nhìn trực quan về dữ liệu và thông tin hệ thống. Bạn có thể theo dõi các xu hướng, phân tích hiệu suất và nhận thông báo về các sự kiện quan trọng trong hệ thống.
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
