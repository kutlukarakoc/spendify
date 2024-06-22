import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetStorageItem } from "~/types/getStorageItemReturn";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setStorageItem = async (
  key: string,
  value: string | object | Array<any> | number | boolean
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return "success";
  } catch (error) {
    console.error("Error setting item:", error);
    return "error";
  }
};

export const getStorageItem = async (key: string): Promise<GetStorageItem> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return {
      status: "success",
      data: value !== null ? JSON.parse(value) : null,
    };
  } catch (error) {
    console.error("Error getting item:", error);
    return {
      status: "error",
      data: null,
    };
  }
};

export const removeStorageItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
