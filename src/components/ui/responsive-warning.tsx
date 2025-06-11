'use client';

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ResponsiveWarningProps {
  message: string;
  severity?: "info" | "warning" | "error" | "success";
  duration?: number;
  onClose?: () => void;
}

export default function ResponsiveWarning({
  message,
  severity = "warning",
  duration = 5000,
  onClose,
}: ResponsiveWarningProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getSeverityStyles = () => {
    switch (severity) {
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: "text-red-500",
        };
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: "text-green-500",
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "text-blue-500",
        };
      default:
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          icon: "text-amber-500",
        };
    }
  };

  const styles = getSeverityStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 max-w-md w-full ${styles.bg} ${styles.border} border rounded-lg shadow-lg`}
        >
          <div className="p-4 flex items-start gap-3">
            <AlertTriangle className={`w-5 h-5 mt-0.5 ${styles.icon}`} />
            <div className="flex-1">
              <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className={`p-1 rounded-full hover:bg-white/50 transition-colors ${styles.text}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 