import type { FilterCondition } from "../types/filter";

const FILTER_KEY = "employee-filters";

export const saveFilters = (
  filters: FilterCondition[]
) => {
  localStorage.setItem(
    FILTER_KEY,
    JSON.stringify(filters)
  );
};

export const loadFilters = (): FilterCondition[] => {
  const saved = localStorage.getItem(FILTER_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const clearFilters = () => {
  localStorage.removeItem(FILTER_KEY);
};