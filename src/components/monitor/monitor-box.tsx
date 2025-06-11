"use client"

import type React from "react"
import { motion } from "framer-motion"

interface MonitorBoxProps {
  title: string
  icon: React.ElementType
  value: string
  unit?: string
  status?: "normal" | "warning" | "critical" | "success"
  trend?: "up" | "down" | "stable"
}

export default function MonitorBox({ title, icon, value, unit, status = "normal", trend = "stable" }: MonitorBoxProps) {
  const Icon = icon

  // Color schemes based on status
  const getStatusColors = () => {
    switch (status) {
      case "success":
        return {
          bg: "bg-gradient-to-br from-emerald-50 to-green-50",
          iconBg: "bg-gradient-to-br from-emerald-100 to-green-100",
          iconColor: "text-emerald-600",
          border: "border-emerald-200",
          accent: "bg-emerald-500",
        }
      case "warning":
        return {
          bg: "bg-gradient-to-br from-amber-50 to-orange-50",
          iconBg: "bg-gradient-to-br from-amber-100 to-orange-100",
          iconColor: "text-amber-600",
          border: "border-amber-200",
          accent: "bg-amber-500",
        }
      case "critical":
        return {
          bg: "bg-gradient-to-br from-red-50 to-rose-50",
          iconBg: "bg-gradient-to-br from-red-100 to-rose-100",
          iconColor: "text-red-600",
          border: "border-red-200",
          accent: "bg-red-500",
        }
      default:
        return {
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
          iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100",
          iconColor: "text-blue-600",
          border: "border-blue-200",
          accent: "bg-blue-500",
        }
    }
  }

  const colors = getStatusColors()

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: Math.random() * 0.2,
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={`
                relative w-full p-4 sm:p-6 rounded-2xl border-2 ${colors.border} ${colors.bg}
                shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
                backdrop-blur-sm overflow-hidden group
            `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-white transform -translate-x-8 sm:-translate-x-12 translate-y-8 sm:translate-y-12"></div>
      </div>

      {/* Status Indicator */}
      <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 rounded-full ${colors.accent} animate-pulse`}></div>

      {/* Icon Section */}
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className={`
                    flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl 
                    ${colors.iconBg} ${colors.iconColor} shadow-md
                    group-hover:shadow-lg transition-all duration-300
                `}
      >
        <Icon size={24} strokeWidth={2} className="sm:w-7 sm:h-7" />
      </motion.div>

      {/* Content Section */}
      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">{title}</h3>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">{getTrendIcon()}</span>
        </div>

        <div className="flex items-baseline space-x-2">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900"
          >
            {value}
          </motion.span>
          {unit && <span className="text-base sm:text-lg font-semibold text-gray-600">{unit}</span>}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Number.parseFloat(value) || 0, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full ${colors.accent} rounded-full`}
          />
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 transform -skew-x-12"></div>
    </motion.div>
  )
}
