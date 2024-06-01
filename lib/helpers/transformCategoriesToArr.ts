import { Categories } from "~/constants/Categories";

export type TransformedCategory = {
  name: string;
  id: string;
  color: string;
  icon: string;
};

export function transformCategoriesToArray(): TransformedCategory[] {
  return Object.entries(Categories).map(([key, category]) => ({
    name: category.name,
    id: key,
    color: category.color,
    icon: category.icon,
  }));
}
