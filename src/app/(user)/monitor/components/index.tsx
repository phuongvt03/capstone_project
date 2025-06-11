"use client";

import MonitorHeader from "@/app/(user)/monitor/components/monitor-header";
import MonitorBox from "@/components/monitor/monitor-box";
import { Skeleton } from "@/components/ui/skeleton";
import { useDatabase } from "@/hooks/use-database";
import {
  CalendarDays,
  Clock,
  Droplets,
  EyeOff,
  GaugeIcon,
  MoveRight,
  MoveUp,
  TestTube2,
  Thermometer,
} from "lucide-react";

export default function MonitorComponent() {
  const {
    data: dataM,
    loading: loadingM,
    error: errorM,
  } = useDatabase<SensorRecord>("/");

  return (
    <div>
      <MonitorHeader />
      <div className="p-2 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {dataM !== null ? (
            <>
              <MonitorBox
                icon={Clock}
                title="Thời gian"
                value={dataM?.Thoi_gian || "0.00"}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={CalendarDays}
                title="Ngày"
                value={dataM?.Ngay || "0.00"}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={Thermometer}
                title="Nhiệt độ"
                value={dataM?.Nhiet_do}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={Droplets}
                title="Độ ẩm"
                value={dataM?.Do_am || "0.00"}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={TestTube2}
                title="Độ pH"
                value={dataM?.pH || "0.00"}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={EyeOff}
                title="Độ đục"
                value={dataM?.Do_duc || "0.00"}
                unit="NTU"
                status="normal"
              />
              <MonitorBox
                icon={MoveRight}
                title="Kinh độ"
                value={dataM?.Kinh_do || "0.00"}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={MoveUp}
                title="Vĩ độ"
                value={dataM?.Vi_do || "0.00"}
                unit=""
                status="normal"
              />
              <MonitorBox
                icon={GaugeIcon}
                title="Tốc độ"
                value={dataM?.Toc_do || "0.00"}
                unit="km/h"
                status="normal"
              />
            </>
          ) : (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full p-4 sm:p-6 rounded-2xl border bg-white shadow-md"
              >
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-3 sm:mb-4" />
                <Skeleton className="h-4 sm:h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 sm:h-4 w-1/2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
