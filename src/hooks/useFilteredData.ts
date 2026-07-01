import { useMemo } from "react";

import type { Employee } from "../types/employee";
import type { FilterCondition } from "../types/filter";
import { filterEmployees } from "../services/filterEngine";

export const useFilteredData = (
  employees: Employee[],
  filters: FilterCondition[]
): Employee[] => {
  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, filters);
  }, [employees, filters]);

  return filteredEmployees;
};