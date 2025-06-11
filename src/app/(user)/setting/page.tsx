import SettingComponent from "@/app/(user)/setting/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cài đặt hệ thống",
    description: "Quản lý và cấu hình các thiết lập hệ thống",
};


export default function SettingPage() {
    return (
        <div>
            <SettingComponent />
        </div>
    )
}
