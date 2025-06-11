"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Droplets,
    Gauge,
    Settings,
    Timer,
    Loader2,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    RotateCcw,
    Zap,
    Thermometer,
    Fan,
    ArrowUp,
    ArrowDown,
    Power,
    Activity,
    RefreshCcw,
    TrendingUpIcon,
    TrendingDownIcon,
} from "lucide-react"
import { useDatabase } from "@/hooks/use-database"

// Mock hook for demonstration

// Skeleton Components
const ParameterSkeleton = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                </div>
            </div>
        ))}
    </motion.div>
)

const SectionSkeleton = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
    >
        <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
            <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
        </div>
        <ParameterSkeleton />
    </motion.div>
)

export default function SettingPID() {
    const [formData, setFormData] = useState<DataC>({
        CP: 0,
        SP: 0,
        D: 0,
        I: 0,
        P: 0,
        KD: 0,
        KI: 0,
        KP: 0,
        TT: 0,
        INV: 0,
        ST: 0,
        MAX: 0,
        MIN: 0,
        ND: 0,
    })

    const [initialValues, setInitialValues] = useState<DataC>({
        CP: 0,
        SP: 0,
        D: 0,
        I: 0,
        P: 0,
        KD: 0,
        KI: 0,
        KP: 0,
        TT: 0,
        INV: 0,
        ST: 0,
        MAX: 0,
        MIN: 0,
        ND: 0,
    })

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { data: dataC, loading: loadingC, updateRootData: updateDataC } = useDatabase<DataC>("/C")

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    }

    const sectionVariants = {
        hidden: { opacity: 0, x: -30, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.1,
            },
        },
    }

    const paramVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    }

    const validateNumber = (value: string) => {
        return /^-?\d*\.?\d*$/.test(value) && value !== ""
    }

    const handleParamChange = (param: keyof DataC, value: string) => {
        const newErrors = { ...errors }

        if (!validateNumber(value) && value !== "") {
            newErrors[param] = "Chỉ được nhập số"
        } else {
            delete newErrors[param]
        }

        setErrors(newErrors)

        const numValue = Number(value) || 0
        setFormData((prev) => ({ ...prev, [param]: numValue }))
    }

    const handleSave = async () => {
        if (Object.keys(errors).length > 0) return

        setIsSaving(true)
        setSaveSuccess(false)
        try {
            updateDataC({
                ...dataC,
                ...formData,
                 CP: 1,
            }).then(() => {
                console.log("Settings updated successfully");
            }).catch((error) => {
                console.error("Error updating settings:", error);
                setErrors({
                    speed: "Lỗi khi cập nhật tốc độ quạt",
                    tempThreshold: "Lỗi khi cập nhật ngưỡng nhiệt độ",
                    waterLevel: "Lỗi khi cập nhật mức nước",
                });
                setIsEditing(false);
                return;
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving settings:", error)
        } finally {
        }
    }

    const handleCancel = () => {
        setFormData(initialValues)
        setErrors({})
        setIsEditing(false)
    }

    const renderParameter = (
        icon: React.ReactNode,
        label: string,
        value: number,
        param: keyof DataC,
        unit: string,
        description: string,
    ) => {
        const hasError = errors[param]

        return (
            <motion.div
                variants={paramVariants}
                className="flex items-center gap-4 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    {icon}
                </motion.div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <label className="text-sm font-semibold text-gray-700">{label}</label>
                        <span className="text-xs text-gray-500">({description})</span>
                    </div>

                    <div className="relative">
                        <motion.input
                            type="text"
                            value={value.toString()}
                            disabled={!isEditing}
                            onChange={(e) => handleParamChange(param, e.target.value)}
                            className={`w-full px-3 py-2 border-2 rounded-lg transition-all duration-300 outline-none text-sm
                ${hasError
                                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50"
                                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                }
                ${!isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
              `}
                            whileFocus={{ scale: 1.01 }}
                        />
                        {unit && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">{unit}</div>
                        )}
                    </div>

                    <AnimatePresence>
                        {hasError && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="flex items-center gap-1 mt-1"
                            >
                                <AlertCircle className="w-3 h-3 text-red-500" />
                                <span className="text-xs text-red-500">{hasError}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        )
    }

    const renderSection = (
        title: string,
        subtitle: string,
        icon: React.ReactNode,
        gradient: string,
        children: React.ReactNode,
    ) => (
        <motion.div
            variants={sectionVariants}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -2 }}
        >
            <div className="flex items-center gap-4 mb-6">
                <motion.div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${gradient} text-white shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                >
                    {icon}
                </motion.div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
            </div>

            <div className="space-y-4">{children}</div>
        </motion.div>
    )

    useEffect(() => {
        if (dataC) {
            setInitialValues(dataC)
            setFormData(dataC)
        }
    }, [dataC])

    return (
        <div>
            {dataC != null ? <motion.div variants={containerVariants} animate="visible" className="max-w-7xl mx-auto p-6">
                <motion.div variants={paramVariants} className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cài đặt hệ thống điều khiển</h1>
                    <p className="text-gray-600">Điều chỉnh các thông số PID và cấu hình hệ thống</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
                    {/* Water Level PID */}
                    {renderSection(
                        "PID Mực nước",
                        "Thông số PID cho điều khiển mực nước",
                        <Droplets className="w-6 h-6" />,
                        "bg-gradient-to-br from-blue-500 to-cyan-500",
                        <>
                            {renderParameter(<TrendingUp className="w-5 h-5" />, "P", formData.P, "P", "", "Hệ số tỷ lệ")}
                            {renderParameter(<RotateCcw className="w-5 h-5" />, "I", formData.I, "I", "", "Hệ số tích phân")}
                            {renderParameter(<Zap className="w-5 h-5" />, "D", formData.D, "D", "", "Hệ số vi phân")}
                            {renderParameter(<RefreshCcw className="w-5 h-5" />, "ST", formData.ST, "ST", "", "Chu kì lấy mãu")}
                            {renderParameter(<TrendingUpIcon className="w-5 h-5" />, "MAX", formData.MAX, "MAX", "", "Giới hạn trên")}
                            {renderParameter(<TrendingDownIcon className="w-5 h-5" />, "MIN", formData.MIN, "MIN", "", "Giới hạn dưới")}
                        </>,
                    )}

                    {/* Pressure PID */}
                    {renderSection(
                        "PID Áp suất",
                        "Thông số PID cho điều khiển áp suất",
                        <Gauge className="w-6 h-6" />,
                        "bg-gradient-to-br from-orange-500 to-red-500",
                        <>
                            {renderParameter(<TrendingUp className="w-5 h-5" />, "KP", formData.KP, "KP", "", "Hệ số tỷ lệ")}
                            {renderParameter(<RotateCcw className="w-5 h-5" />, "KI", formData.KI, "KI", "", "Hệ số tích phân")}
                            {renderParameter(<Zap className="w-5 h-5" />, "KD", formData.KD, "KD", "", "Hệ số vi phân")}
                            {renderParameter(<RefreshCcw className="w-5 h-5" />, "ST", formData.ST, "ST", "", "Chu kì lấy mãu")}
                            {renderParameter(<TrendingUpIcon className="w-5 h-5" />, "MAX", formData.MAX, "MAX", "", "Giới hạn trên")}
                            {renderParameter(<TrendingDownIcon className="w-5 h-5" />, "MIN", formData.MIN, "MIN", "", "Giới hạn dưới")}
                        </>,
                    )}

                    {/* General Settings */}
                    {/* {renderSection(
              "Cài đặt chung",
              "Các thông số cấu hình hệ thống",
              <Settings className="w-6 h-6" />,
              "bg-gradient-to-br from-purple-500 to-indigo-500",
              <>
                {renderParameter(<Droplets className="w-5 h-5" />, "SP", formData.SP, "SP", "%", "Đặt mực nước")}
                {renderParameter(<Timer className="w-5 h-5" />, "ST", formData.ST, "ST", "ms", "Chu kỳ lấy mẫu")}
                {renderParameter(<ArrowUp className="w-5 h-5" />, "MAX", formData.MAX, "MAX", "%", "Ngưỡng giới hạn trên")}
                {renderParameter(
                  <ArrowDown className="w-5 h-5" />,
                  "MIN",
                  formData.MIN,
                  "MIN",
                  "%",
                  "Ngưỡng giới hạn dưới",
                )}
                {renderParameter(
                  <Thermometer className="w-5 h-5" />,
                  "ND",
                  formData.ND,
                  "ND",
                  "°C",
                  "Ngưỡng nhiệt độ cảnh báo",
                )}
                {renderParameter(<Fan className="w-5 h-5" />, "INV", formData.INV, "INV", "RPM", "Tốc độ quạt hút")}
                {renderParameter(<Power className="w-5 h-5" />, "CP", formData.CP, "CP", "", "Cho phép")}
                {renderParameter(<Activity className="w-5 h-5" />, "TT", formData.TT, "TT", "", "Thời gian")}
              </>,
            )} */}
                </div>

                <motion.div variants={paramVariants} className="flex justify-end gap-4">
                    <AnimatePresence mode="wait">
                        {!isEditing ? (
                            <motion.button
                                key="edit"
                                onClick={() => setIsEditing(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <Settings className="w-4 h-4" />
                                Chỉnh sửa
                            </motion.button>
                        ) : (
                            <motion.div key="editing" className="flex gap-4" layout>
                                <motion.button
                                    onClick={handleCancel}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200"
                                    disabled={isSaving}
                                >
                                    Hủy bỏ
                                </motion.button>

                                <motion.button
                                    onClick={handleSave}
                                    whileHover={!isSaving ? { scale: 1.02 } : {}}
                                    whileTap={!isSaving ? { scale: 0.98 } : {}}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center"
                                    disabled={isSaving || Object.keys(errors).length > 0}
                                >
                                    <AnimatePresence mode="wait">
                                        {isSaving ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Đang lưu...</span>
                                            </motion.div>
                                        ) : saveSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Đã lưu!</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span key="save">Lưu cài đặt</motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-96 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    <SectionSkeleton />
                    <SectionSkeleton />
                    <SectionSkeleton />
                </div>

                <div className="flex justify-end">
                    <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse" />
                </div>
            </motion.div>

            }
        </div>
    )
}
