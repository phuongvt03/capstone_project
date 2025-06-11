"use client";

import GraphChart from "@/app/(user)/graph/components/graph-chart";
import GraphHeader from "@/app/(user)/graph/components/graph-header";
import MonitorBox from "@/components/monitor/monitor-box";
import { useDatabase } from "@/hooks/use-database";
import {
  DropletsIcon,
  FlaskConical,
  ThermometerSunIcon,
  Waves,
  WavesIcon,
  WeightIcon,
  ZapIcon,
} from "lucide-react";
import { useState } from "react";

export default function GraphComponent() {
  const {
    data: dataM,
    loading: loadingM,
    error: errorM,
  } = useDatabase<SensorRecord>("/");

  const [activeTab, setActiveTab] = useState<
    "temperature" | "humidity" | "pH" | "turbidity"
  >("temperature");

  return (
    <div>
      <GraphHeader />
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MonitorBox
            icon={ThermometerSunIcon}
            title="Nhiệt độ"
            value={dataM?.Nhiet_do || "0.00"}
            unit="°C"
            status="success"
            trend="up"
          />
          <MonitorBox
            icon={DropletsIcon}
            title="Độ ẩm"
            value={dataM?.Do_am || "0.00"}
            unit="%"
            status="normal"
            trend="stable"
          />
          <MonitorBox
            icon={FlaskConical}
            title="Độ pH"
            value={dataM?.pH || "0.00"}
            unit=""
            status="success"
            trend="stable"
          />
          <MonitorBox
            icon={Waves}
            title="Độ đục"
            value={dataM?.Do_duc || "0.00"}
            unit="NTU"
            status="warning"
            trend="down"
          />
        </div>
        <div className="mt-10 flex flex-col gap-y-4">
          <div className="flex items-center gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "temperature"
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-200"
                }`}
              onClick={() => setActiveTab("temperature")}
            >
              Xem đồ thị nhiệt độ
            </button>
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "humidity"
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-200"
                }`}
              onClick={() => setActiveTab("humidity")}
            >
              Xem đồ thị độ ẩm
            </button>
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "pH"
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-200"
                }`}
              onClick={() => setActiveTab("pH")}
            >
              Xem đồ thị độ pH
            </button>
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "turbidity"
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-200"
                }`}
              onClick={() => setActiveTab("turbidity")}
            >
              Xem đồ thị độ đục
            </button>
          </div>
          <div>
            {activeTab === "temperature" && (
              <GraphChart
                title1={null}
                title2="Nhiệt độ hiện tại"
                value1={0}
                value2={(Number(dataM?.Nhiet_do.split(" ")[0])) ?? 0}
                maxDataPoints={30}
                height={400}
              />
            )}
            {activeTab === "humidity" && (
              <GraphChart
                title1={null}
                title2="Độ ẩm hiện tại"
                value1={0}
                value2={(Number(dataM?.Do_am.split(" ")[0])) ?? 0}
                maxDataPoints={30}
                height={400}
              />
            )}
            {activeTab === "pH" && (
              <GraphChart
                title1={null}
                title2="pH hiện tại"
                value1={0}
                value2={(Number(dataM?.pH.split(" ")[0])) ?? 0}
                maxDataPoints={30}
                height={400}
              />
            )}
            {activeTab === "turbidity" && (
              <GraphChart
                title1={null}
                title2="Độ đục hiện tại"
                value1={0}
                value2={(Number(dataM?.Do_duc.split(" ")[0])) ?? 0}
                maxDataPoints={30}
                height={400}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
