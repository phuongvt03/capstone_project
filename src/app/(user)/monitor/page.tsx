import MonitorComponent from "@/app/(user)/monitor/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giám sát hệ thống",
  description:
    "Theo dõi trạng thái hoạt động hệ thống như nhiệt độ, độ ẩm , độ pH , độ đục và các cảm biến khác theo thời gian thực.",
};

export default function MonitorPage() {
  return (
    <div>
      <MonitorComponent />
    </div>
  );
}
