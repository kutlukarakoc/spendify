import { Expense } from "./expense";

export type GetStorageItem = {
  status: "success" | "error";
  data: Expense[] | null;
};
