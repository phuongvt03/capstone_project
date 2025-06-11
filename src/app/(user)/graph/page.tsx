import GraphComponent from "@/app/(user)/graph/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Biểu đồ hệ thống",
    description: "Biểu đồ hệ thống hiển thị dữ liệu và thông tin về hoạt động của hệ thống",
};

export default function GraphPage() {
    return (
        <div>
            <GraphComponent />
        </div>
    )
}
