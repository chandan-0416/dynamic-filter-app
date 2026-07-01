export const FieldType = {
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  SELECT: "select",
  MULTI_SELECT: "multiSelect",
  BOOLEAN: "boolean",
} as const;

export type FieldType = typeof FieldType[keyof typeof FieldType];

export type FilterOperator =
  | "contains"
  | "equals"
  | "startsWith"
  | "endsWith"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "between"
  | "before"
  | "after"
  | "on"
  | "in"
  | "notIn"
  | "is"
  | "isNot";

export interface FilterFieldConfig {
  key: string;
  label: string;
  type: FieldType;
  operators: FilterOperator[];
  options?: string[];
}

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: [];
}