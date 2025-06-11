"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
    Activity,
    Clock,
    Pause,
    Play,
    RotateCcw
} from "lucide-react"

interface DataPoint {
    time: string
    elapsedSeconds: number
    value1: number
    value2: number
    timestamp: number
}

interface GraphChartProps {
    title1?: string | null // Title for fixed line
    title2: string // Title for realtime line
    value1: number // Fixed value
    value2: number // Realtime value
    maxDataPoints?: number // Number of data points to show in viewport
    updateInterval?: number // Update interval in ms
    height?: number // Chart height
    showControls?: boolean // Show play/pause/reset controls
}

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
                <p className="font-semibold text-gray-800 mb-2">{`Thời gian: ${label}`}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        {`${entry.name}: ${entry.value.toFixed(2)}`}
                    </div>
                ))}
            </motion.div>
        )
    }
    return null
}

export default function GraphChart({
    title1,
    title2,
    value1,
    value2,
    maxDataPoints = 60,
    updateInterval = 1000,
    height = 400,
    showControls = true,
}: GraphChartProps) {
    const [allData, setAllData] = useState<DataPoint[]>([]) // Store all historical data
    const [viewportData, setViewportData] = useState<DataPoint[]>([]) // Data currently visible
    const [isRunning, setIsRunning] = useState(true)
    const [isLiveMode, setIsLiveMode] = useState(true) // Live mode vs historical mode
    const [viewportStart, setViewportStart] = useState(0) // Start index of viewport
    const [viewportEnd, setViewportEnd] = useState(maxDataPoints) // End index of viewport

    const startTimeRef = useRef<number>(Date.now())
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Format elapsed time as MM:SS
    const formatElapsedTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    // Add new data point
    const addDataPoint = useCallback(() => {
        const now = Date.now()
        const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000)

        const newDataPoint: DataPoint = {
            time: formatElapsedTime(elapsedSeconds),
            elapsedSeconds,
            value1,
            value2,
            timestamp: now,
        }

        setAllData((prevData) => [...prevData, newDataPoint])
    }, [value1, value2])

    // Update viewport data based on current view settings
    const updateViewport = useCallback(() => {
        if (isLiveMode) {
            // In live mode, show the latest data
            const latestData = allData.slice(-maxDataPoints)
            setViewportData(latestData)
            setViewportStart(Math.max(0, allData.length - maxDataPoints))
            setViewportEnd(allData.length)
        } else {
            // In historical mode, show data based on viewport indices
            const historicalData = allData.slice(viewportStart, viewportEnd)
            setViewportData(historicalData)
        }
    }, [allData, isLiveMode, maxDataPoints, viewportStart, viewportEnd])

    // Start/stop data collection
    const toggleCollection = () => {
        if (isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            setIsRunning(false)
        } else {
            startTimeRef.current = Date.now() - (allData.length > 0 ? allData[allData.length - 1].elapsedSeconds * 1000 : 0)
            intervalRef.current = setInterval(addDataPoint, updateInterval)
            setIsRunning(true)
        }
    }

    // Reset chart
    const resetChart = () => {
        setAllData([])
        setViewportData([])
        setIsLiveMode(true)
        setViewportStart(0)
        setViewportEnd(maxDataPoints)
        startTimeRef.current = Date.now()
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        if (isRunning) {
            intervalRef.current = setInterval(addDataPoint, updateInterval)
        }
    }

    // Initialize data collection
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(addDataPoint, updateInterval)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, addDataPoint, updateInterval])

    // Update viewport when data changes
    useEffect(() => {
        updateViewport()
    }, [updateViewport])

    // Add data point when values change
    useEffect(() => {
        if (isRunning) {
            addDataPoint()
        }
    }, [value1, value2, addDataPoint, isRunning])

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
            {/* Controls */}
            {showControls && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-gray-800">Biểu đồ thời gian thực</span>
                            </div>
                            <AnimatePresence>
                                {isRunning && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="flex items-center gap-1 text-green-600"
                                    >
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium">Đang chạy</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2">
                            <motion.button
                                onClick={toggleCollection}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${isRunning ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                            >
                                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                {isRunning ? "Dừng" : "Chạy"}
                            </motion.button>
                            <motion.button
                                onClick={resetChart}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all text-sm"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </motion.button>
                        </div>
                    </div>

                </motion.div>
            )}

            {/* Current Values Display */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4 mb-4"
            >
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    {title1 !== null && <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-gray-700">{title1}</span>
                    </div>}
                    <div className="text-2xl font-bold text-green-600">{value1.toFixed(2)}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium text-gray-700">{title2}</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{value2.toFixed(2)}</div>
                </div>
            </motion.div>

            {/* Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Dữ liệu theo thời gian</h3>
                    </div>
                    <div className="text-sm text-gray-600">
                        {viewportData.length > 0 && (
                            <>
                                {isLiveMode ? "Trực tiếp" : "Lịch sử"}: {viewportData[viewportData.length - 1]?.time || "00:00"}
                            </>
                        )}
                    </div>
                </div>

                <div style={{ width: "100%", height }}>
                    <ResponsiveContainer>
                        <LineChart data={viewportData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="time"
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                interval="preserveStartEnd"
                            />
                            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />

                            {/* Fixed Value Line */}
                            {title1 !== null && <Line
                                type="monotone"
                                dataKey="value1"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                name={title1}
                                connectNulls={false}
                            />}

                            {/* Realtime Value Line */}
                            <Line
                                type="monotone"
                                dataKey="value2"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                                name={title2}
                                animationDuration={300}
                                connectNulls={false}
                            />


                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                {viewportData.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-gray-600">Điểm hiển thị</div>
                                <div className="font-semibold">{viewportData.length}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Tổng dữ liệu</div>
                                <div className="font-semibold">{allData.length}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Độ lệch hiện tại</div>
                                <div className="font-semibold">{Math.abs(value2 - value1).toFixed(2)}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Max {title2}</div>
                                <div className="font-semibold">
                                    {viewportData.length > 0 ? Math.max(...viewportData.map((d) => d.value2)).toFixed(2) : "N/A"}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Min {title2}</div>
                                <div className="font-semibold">
                                    {viewportData.length > 0 ? Math.min(...viewportData.map((d) => d.value2)).toFixed(2) : "N/A"}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
