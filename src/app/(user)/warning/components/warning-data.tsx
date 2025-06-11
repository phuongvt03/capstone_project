"use client"

import { useState, useMemo, useEffect } from "react"
import {
  CalendarIcon,
  Download,
  AlertTriangle,
  TrendingUp,
  Filter,
  FileSpreadsheet,
  Database,
  Clock,
  Thermometer,
  Droplets,
  Activity,
  Eye,
  RefreshCw,
} from "lucide-react"
import * as XLSX from "xlsx"
import { useDatabase } from "@/hooks/use-database"

declare type DataW = {
  [timestamp: string]: {
    Do_am: string
    Do_duc: string
    Ngay: string
    Nhiet_do: string
    Thoi_gian: string
    Toc_do: string
    Timestampt: string
    pH: string
  }
}

export default function MonitoringAlert() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const { data, loading, error } = useDatabase<DataW>("/W")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Convert data object to array
  const dataArray = useMemo(() => {
    if (!data) return []
    return Object.entries(data)
      .map(([timestamp, values], index) => ({
        stt: index + 1,
        timestamp,
        ...values,
      }))
      .sort((a, b) => new Date(b.Timestampt).getTime() - new Date(a.Timestampt).getTime())
  }, [data])

  // Filter data by date range
  const filteredData = useMemo(() => {
    if (!startDate && !endDate) return dataArray

    return dataArray.filter((item) => {
      const itemDate = new Date(item.Timestampt)
      const start = startDate ? new Date(startDate) : new Date("1900-01-01")
      const end = endDate ? new Date(endDate + "T23:59:59") : new Date("2100-12-31")

      return itemDate >= start && itemDate <= end
    })
  }, [dataArray, startDate, endDate])

  // Export filtered data to Excel
  const exportToExcel = () => {
    if (filteredData.length === 0) return

    const exportData = filteredData.map((item) => ({
      STT: item.stt,
      "Độ ẩm (%)": item.Do_am,
      "Độ đục (NTU)": item.Do_duc,
      Ngày: item.Ngay,
      "Nhiệt độ (°C)": item.Nhiet_do,
      "Thời gian": item.Thoi_gian,
      "Tốc độ (m/s)": item.Toc_do,
      pH: item.pH,
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Dữ liệu giám sát")

    const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
      wch: Math.max(key.length, 15),
    }))
    ws["!cols"] = colWidths

    XLSX.writeFile(wb, `du-lieu-giam-sat-${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filter Section */}
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Lọc dữ liệu theo thời gian</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStartDate("")
                    setEndDate("")
                  }}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Xóa lọc
                </button>
              </div>

              <div className="flex items-end">
                <button
                  onClick={exportToExcel}
                  disabled={filteredData.length === 0}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${filteredData.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                >
                  <Download className="w-4 h-4" />
                  Xuất Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-700 delay-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Dữ liệu giám sát</h2>
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-blue-700">{filteredData.length} bản ghi</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-600">Đang tải dữ liệu...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-red-600 font-medium">Có lỗi xảy ra khi tải dữ liệu</p>
                <p className="text-gray-500 text-sm mt-1">Vui lòng thử lại sau</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSpreadsheet className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">Không có dữ liệu trong khoảng thời gian đã chọn</p>
                <p className="text-gray-500 text-sm mt-1">Hãy thử điều chỉnh bộ lọc</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">STT</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          Độ ẩm (%)
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Độ đục (NTU)</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-gray-500" />
                          Ngày
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          Nhiệt độ (°C)
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          Thời gian
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tốc độ (m/s)</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">pH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr
                        key={item.timestamp}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                      >
                        <td className="py-3 px-4 font-medium text-blue-600">{item.stt}</td>
                        <td className="py-3 px-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            {item.Do_am}%
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{item.Do_duc}</td>
                        <td className="py-3 px-4 text-gray-700">{item.Ngay}</td>
                        <td className="py-3 px-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            {item.Nhiet_do}°C
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{item.Thoi_gian}</td>
                        <td className="py-3 px-4 text-gray-700">{item.Toc_do}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.pH}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
