import type { FilterCondition, FilterFieldConfig } from "../types/filter";
import { FieldType } from "../types/filter";

export const isFilterValid = (
  filter: FilterCondition,
  fieldConfig?: FilterFieldConfig
): boolean => {
  if (!fieldConfig) {
    return false;
  }

  switch (fieldConfig.type) {
    case FieldType.TEXT:
    case FieldType.SELECT:
    case FieldType.DATE:
      return (
        typeof filter.value === "string" &&
        filter.value.trim().length > 0
      );

    case FieldType.NUMBER:
      return (
        typeof filter.value === "number" &&
        !Number.isNaN(filter.value)
      );

    case FieldType.MULTI_SELECT:
      return (
        Array.isArray(filter.value) &&
        filter.value.length > 0
      );

    case FieldType.BOOLEAN:
      return typeof filter.value === "boolean";

    default:
      return false;
  }
};

export const areFiltersValid = (
  filters: FilterCondition[],
  fields: FilterFieldConfig[]
): boolean => {
  return filters.every((filter) => {
    const field = fields.find(
      (item) => item.key === filter.field
    );

    return isFilterValid(filter, field);
  });
};