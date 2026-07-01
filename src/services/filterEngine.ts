import type { Employee } from "../types/employee";
import type { FilterCondition } from "../types/filter";

import { getNestedValue } from "../utils/getNestedValue";
import { operators } from "../utils/operators";

/**
 * Filters employee data based on active filter conditions.
 */
export function filterEmployees(
  employees: Employee[],
  filters: FilterCondition[]
): Employee[] {
  // No filters → return all employees
  if (filters.length === 0) {
    return employees;
  }

  return employees.filter((employee) => {
    return filters.every((filter) => {
      // Skip incomplete filters
      if (
        filter.value === "" ||
        filter.value === null ||
        filter.value === undefined
      ) {
        return true;
      }

      // Get employee field value (supports nested paths)
      // cast employee to a generic record to satisfy getNestedValue's parameter type
      const employeeValue = getNestedValue(
        employee as unknown as Record<string, unknown>,
        filter.field
      );

      // Find operator function
      const operator = operators[filter.operator];

      if (!operator) {
        return true;
      }

      // Compare values
      return operator(employeeValue, filter.value);
    });
  });
}