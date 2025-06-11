import WarningComponent from "@/app/(user)/warning/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cảnh báo hệ thống",
    description: "Cảnh báo hệ thống cung cấp thông tin về các vấn đề hoặc sự cố trong hệ thống",
};

export default function WarningPage() {

    return (
        <div>
            <WarningComponent />
        </div>
    )
}
