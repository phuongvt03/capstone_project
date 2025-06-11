"use client";

import type React from "react";

import { motion } from "framer-motion";
import {
  Zap,
  Droplets,
  Gauge,
  Thermometer,
  Settings,
  Activity,
  Cpu,
  FlaskConical,
  Wrench,
  Eye,
  ArrowRight,
  Cloudy,
  Waves,
  TestTube,
  ArrowUpDown,
  ArrowLeftRight,
  Globe,
  Navigation,
  Clock,
  Radio,
} from "lucide-react";

interface SpecificationItem {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

const specifications: SpecificationItem[] = [
  {
    icon: Zap,
    label: "Nguồn cấp thiết bị",
    value: "3.3V-5V",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Cpu,
    label: "ESP32",
    value: "3.3V-5V",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Thermometer,
    label: "Cảm biến nhiệt độ",
    value: "DHT11-%",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Droplets,
    label: "Cảm biến độ ẩm",
    value: "DHT11-%",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Waves,
    label: "Cảm biến độ đục",
    value: "MJKDZ-NTU",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
  {
    icon: FlaskConical,
    label: "Cảm biến độ pH",
    value: "PH-4502C",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Globe,
    label: "Kinh độ",
    value: "GPS-Neo 106.660172",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Navigation,
    label: "Vĩ độ",
    value: "GPS-Neo 10.762622",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Gauge,
    label: "Tốc độ",
    value: "km/h",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Clock,
    label: "Thời gian",
    value: "DS3231",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Radio,
    label: "LoRa SX1278",
    value: "Sóng vô tuyến",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  //   {
  //     icon: Thermometer,
  //     label: "Cảm biến nhiệt",
  //     value: "Pt100, đọc trực tiếp qua nhiệt kế",
  //     color: "text-red-600",
  //     bgColor: "bg-red-50",
  //   },
  {
    icon: Eye,
    label: "Thuyền điều khiển từ xa ",
    value: "",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
};

export default function InformationComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8 px-6 shadow-lg"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Thông tin bộ thí nghiệm
              </motion.h1>
              <motion.p
                className="text-blue-100 text-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Hệ thống điều khiển và giám sát tự động
              </motion.p>
            </div>
            <motion.div
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Cpu className="w-8 h-8" />
              <div className="text-right">
                <div className="text-xl font-bold">IT 5200</div>
                <div className="text-blue-200 text-sm">Infit Technologies</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Specifications */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" />
                Đặc tính thiết bị gồm có:
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className={`${spec.bgColor} border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group`}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`${spec.color} ${spec.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <spec.icon className="w-5 h-5" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        {spec.label}
                      </h3>
                      <p
                        className={`${spec.color} text-sm font-medium leading-relaxed`}
                      >
                        {spec.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Diagram */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Sơ đồ hệ thống
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
              </div>

              <motion.div
                className="relative overflow-hidden rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/auth2.jpg"
                  alt="IT 5200 System Diagram"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              <motion.div
                className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="text-center">
                  <h4 className="font-bold text-gray-800 mb-1">
                    Hệ thống đo chất lượng nước
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Sử dụng thuyền điều khiển
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200"
        >
          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Hệ thống giám sát từ xa
                </h3>
                <p className="text-gray-600 text-sm">
                  Công nghệ tiên tiến cho giáo dục và nghiên cứu
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Giám sát thời gian thực
                </h4>
                <p className="text-sm text-gray-600">
                  Theo dõi, cập nhật thông số hệ thống liên tục
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Điều khiển từ xa
                </h4>
                <p className="text-sm text-gray-600">
                  Hệ thống thuyền điều khiển và giám sát từ xa
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Giao diện trực quan
                </h4>
                <p className="text-sm text-gray-600">
                  Dashboard hiện đại và dễ sử dụng
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
