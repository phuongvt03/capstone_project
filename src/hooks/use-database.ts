"use client";

import { useState, useEffect } from "react";
import {
  ref,
  onValue,
  off,
  push,
  set,
  remove,
  update,
} from "firebase/database";
import { database } from "@/lib/firebase";

// Regex kiểm tra path không chứa ký tự cấm
const isValidPath = (path: string) => {
  return path && !/[.#$\[\]]/.test(path);
};

export const useDatabase = <T>(path?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path || !isValidPath(path)) {
      setError("Đường dẫn không hợp lệ");
      setLoading(false);
      return;
    }

    const dataRef = ref(database, path);

    const handleData = (snapshot: any) => {
      try {
        const value = snapshot.val();
        setData(value);
        setError(null);
      } catch (err) {
        setError("Lỗi khi đọc dữ liệu");
        console.error("Error reading data:", err);
      } finally {
        setLoading(false);
      }
    };

    onValue(dataRef, handleData, (error) => {
      setError("Lỗi khi kết nối database");
      console.error("Database error:", error);
      setLoading(false);
    });

    return () => {
      off(dataRef);
    };
  }, [path]);

  const addData = async (newData: any) => {
    if (!path || !isValidPath(path)) throw new Error("Path không hợp lệ");

    try {
      const dataRef = ref(database, path);
      const newItemRef = push(dataRef);
      const key = newItemRef.key;
      const dataWithKey = { ...newData, key };
      await set(newItemRef, dataWithKey);
      return key;
    } catch (err) {
      console.error("Error adding data:", err);
      throw err;
    }
  };

  const updateData = async (key: string, newData: any) => {
    if (!path || !isValidPath(path)) throw new Error("Path không hợp lệ");

    try {
      const dataRef = ref(database, `${path}/${key}`);
      await set(dataRef, { ...newData, key });
    } catch (err) {
      console.error("Error updating data:", err);
      throw err;
    }
  };

  const updateRootData = async (newData: any) => {
    try {
      const dataRef = ref(database, "/"); // root path hợp lệ
      await update(dataRef, newData);
    } catch (err) {
      console.error("Error updating root data:", err);
      throw err;
    }
  };

  const deleteData = async (key: string) => {
    if (!path || !isValidPath(path)) throw new Error("Path không hợp lệ");

    try {
      const dataRef = ref(database, `${path}/${key}`);
      await remove(dataRef);
    } catch (err) {
      console.error("Error deleting data:", err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    addData,        // addData({...})
    updateData,     // updateData("key", {...})
    updateRootData, // update entire root
    deleteData,     // deleteData("key")
  };
};
