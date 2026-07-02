import type { Employee } from "../types/employee";
import type {FilterCondition, NumberRangeValue, DateRangeValue,} from "../types/filter";
import { getNestedValue } from "../utils/getNestedValue";
import { operators } from "../utils/operators";

export function filterEmployees(
  employees: Employee[],
  filters: FilterCondition[]
): Employee[] {
  if (filters.length === 0) {
    return employees;
  }

  return employees.filter((employee) => {
    return filters.every((filter) => {
      // Skip empty filters
      if (
        filter.value === "" ||
        filter.value === null ||
        filter.value === undefined
      ) {
        return true;
      }

      // Skip empty number range
      if (
        filter.operator === "between" &&
        typeof filter.value === "object" &&
        filter.value !== null &&
        "min" in filter.value
      ) {
        const range = filter.value as NumberRangeValue;

        if (range.min === "" || range.max === "") {
          return true;
        }
      }

      // Skip empty date range
      if (
        filter.operator === "between" &&
        typeof filter.value === "object" &&
        filter.value !== null &&
        "from" in filter.value
      ) {
        const range = filter.value as DateRangeValue;

        if (range.from === "" || range.to === "") {
          return true;
        }
      }

      const employeeValue = getNestedValue(
        employee as unknown as Record<string, unknown>,
        filter.field
      );

      const operator = operators[filter.operator];

      if (!operator) {
        return true;
      }

      return operator(employeeValue, filter.value);
    });
  });
}