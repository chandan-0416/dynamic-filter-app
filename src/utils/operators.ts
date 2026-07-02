import type {FilterOperator,NumberRangeValue,DateRangeValue,} from "../types/filter";

type OperatorFunction = (
  employeeValue: unknown,
  filterValue: unknown
) => boolean;

export const operators: Record<FilterOperator, OperatorFunction> = {
  // TEXT OPERATORS
  contains: (employeeValue, filterValue) =>
    String(employeeValue)
      .toLowerCase()
      .includes(String(filterValue).toLowerCase()),

  equals: (employeeValue, filterValue) =>
    employeeValue === filterValue,

  startsWith: (employeeValue, filterValue) =>
    String(employeeValue)
      .toLowerCase()
      .startsWith(String(filterValue).toLowerCase()),

  endsWith: (employeeValue, filterValue) =>
    String(employeeValue)
      .toLowerCase()
      .endsWith(String(filterValue).toLowerCase()),

    // NUMBER OPERATORS
  greaterThan: (employeeValue, filterValue) =>
    Number(employeeValue) > Number(filterValue),

  greaterThanOrEqual: (employeeValue, filterValue) =>
    Number(employeeValue) >= Number(filterValue),

  lessThan: (employeeValue, filterValue) =>
    Number(employeeValue) < Number(filterValue),

  lessThanOrEqual: (employeeValue, filterValue) =>
    Number(employeeValue) <= Number(filterValue),
   
  // BETWEEN (Number + Date)
 between: (employeeValue, filterValue) => {
    if (
      typeof filterValue !== "object" ||
      filterValue === null
    ) {
      return false;
    }

    // Number Range
    if ("min" in filterValue && "max" in filterValue) {
      const { min, max } =
        filterValue as NumberRangeValue;

      return (
        Number(employeeValue) >= Number(min) &&
        Number(employeeValue) <= Number(max)
      );
    }

    // Date Range
    if ("from" in filterValue && "to" in filterValue) {
      const { from, to } =
        filterValue as DateRangeValue;

      const employeeDate = new Date(
        String(employeeValue)
      ).getTime();

      return (
        employeeDate >= new Date(from).getTime() &&
        employeeDate <= new Date(to).getTime()
      );
    }

    return false;
  },

  // ARRAY OPERATORS
  in: (employeeValue, filterValue) => {
    if (!Array.isArray(filterValue)) {
      return false;
    }

    if (Array.isArray(employeeValue)) {
      return employeeValue.some((item) =>
        filterValue.includes(item)
      );
    }

    return filterValue.includes(employeeValue);
  },

  notIn: (employeeValue, filterValue) => {
    if (!Array.isArray(filterValue)) {
      return false;
    }

    if (Array.isArray(employeeValue)) {
      return !employeeValue.some((item) =>
        filterValue.includes(item)
      );
    }

    return !filterValue.includes(employeeValue);
  },

  // BOOLEAN
  is: (employeeValue, filterValue) =>
    employeeValue === filterValue,

  isNot: (employeeValue, filterValue) =>
    employeeValue !== filterValue,

  // DATE OPERATORS
  before: (employeeValue, filterValue) =>
    new Date(String(employeeValue)).getTime() <
    new Date(String(filterValue)).getTime(),

  after: (employeeValue, filterValue) =>
    new Date(String(employeeValue)).getTime() >
    new Date(String(filterValue)).getTime(),

  on: (employeeValue, filterValue) =>
    new Date(String(employeeValue)).toDateString() ===
    new Date(String(filterValue)).toDateString(),
};