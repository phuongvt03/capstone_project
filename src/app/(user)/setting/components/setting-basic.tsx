"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Fan, Thermometer, Droplets } from 'lucide-react';
import { JSX } from "react/jsx-runtime";
import { useDatabase } from "@/hooks/use-database";

export default function SettingBasic() {
  const [speed, setSpeed] = useState("");
  const [tempThreshold, setTempThreshold] = useState("");
  const [waterLevel, setWaterLevel] = useState("");

  const { data: dataC, loading: loadingC, error: errorC, updateRootData: updateRootDataC } = useDatabase<DataC>("/C");

  const [initialValues, setInitialValues] = useState({
    speed: "",
    tempThreshold: "",
    waterLevel: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState({
    speed: "",
    tempThreshold: "",
    waterLevel: "",
  });

  const validateNumber = (value: string) => {
    return /^-?\d*\.?\d*$/.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof errors) => {
    const value = e.target.value;
    const newErrors = { ...errors };

    if (!validateNumber(value) && value !== "") {
      newErrors[key] = "Chỉ được nhập số";
    } else {
      newErrors[key] = "";
    }

    setErrors(newErrors);

    switch (key) {
      case "speed":
        setSpeed(value);
        break;
      case "tempThreshold":
        setTempThreshold(value);
        break;
      case "waterLevel":
        setWaterLevel(value);
        break;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleSaveSettings = () => {
    if (Object.values(errors).some((e) => e !== "")) return;

    updateRootDataC({
      ...dataC,
      INV: Number(speed),
      ND: Number(tempThreshold),
      SP: Number(waterLevel),
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

    setInitialValues({
      speed,
      tempThreshold,
      waterLevel,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setSpeed(initialValues.speed);
    setTempThreshold(initialValues.tempThreshold);
    setWaterLevel(initialValues.waterLevel);
    setErrors({ speed: "", tempThreshold: "", waterLevel: "" });
    setIsEditing(false);
  };

  const renderInput = (
    label: string,
    value: string,
    icon: JSX.Element,
    key: keyof typeof errors,
    placeholder: string,
    suffix: string,
    borderColor: string,
    ringColor: string,
    bgColor: string,
    iconColor: string
  ) => (
    <motion.div variants={itemVariants} className="group">
      <label className="flex items-center gap-3 mb-3 text-gray-700 font-medium">
        <div className={`p-2 ${bgColor} rounded-lg group-hover:bg-opacity-80 transition-colors`}>
          {icon}
        </div>
        <span>{label}</span>
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          disabled={!isEditing}
          onChange={(e) => handleChange(e, key)}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-gray-50 focus:bg-white 
          ${errors[key] ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" : `${borderColor} focus:${borderColor} focus:ring-4 ${ringColor}`}
          ${!isEditing ? "cursor-not-allowed bg-gray-100 text-gray-500" : ""}
          `}
          placeholder={placeholder}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
          {suffix}
        </div>
      </div>
      {errors[key] && (
        <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
      )}
    </motion.div>
  );

  useEffect(() => {
    const defaultValues = {
      speed: dataC?.INV?.toFixed(2) || "0.00",
      tempThreshold: dataC?.ND?.toFixed(2) || "0.00",
      waterLevel: dataC?.SP?.toFixed(2) || "0.00",
    };

    setInitialValues(defaultValues);
    setSpeed(defaultValues.speed);
    setTempThreshold(defaultValues.tempThreshold);
    setWaterLevel(defaultValues.waterLevel);
  }, [dataC]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto p-6 bg-white rounded-2xl border border-gray-100"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cài đặt cơ bản</h2>
        <p className="text-gray-600 text-sm">Điều chỉnh các thông số cơ bản của hệ thống</p>
      </motion.div>

      <div className="space-y-6">
        {renderInput(
          "Tốc độ quạt",
          speed,
          <Fan className="w-5 h-5 text-blue-600" />,
          "speed",
          "Nhập tốc độ quạt",
          "RPM",
          "border-gray-200",
          "focus:ring-blue-50",
          "bg-blue-50",
          "text-blue-600"
        )}

        {renderInput(
          "Ngưỡng nhiệt độ cảnh báo",
          tempThreshold,
          <Thermometer className="w-5 h-5 text-orange-600" />,
          "tempThreshold",
          "Nhập ngưỡng nhiệt độ",
          "°C",
          "border-gray-200",
          "focus:ring-orange-50",
          "bg-orange-50",
          "text-orange-600"
        )}

        {renderInput(
          "Cài mức nước",
          waterLevel,
          <Droplets className="w-5 h-5 text-cyan-600" />,
          "waterLevel",
          "Nhập mức nước",
          "%",
          "border-gray-200",
          "focus:ring-cyan-50",
          "bg-cyan-50",
          "text-cyan-600"
        )}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-x-4"
      >
        {!isEditing ? (
          <motion.button
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer"
          >
            Chỉnh sửa
          </motion.button>
        ) : (
          <>
            <motion.button
              onClick={handleCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              Hủy bỏ
            </motion.button>
            <motion.button
              onClick={handleSaveSettings}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer"
            >
              Lưu cài đặt
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
