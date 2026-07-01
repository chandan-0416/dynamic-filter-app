import {
  FieldType,
  type FilterFieldConfig,
} from "../types/filter";

export const employeeFilterConfig: FilterFieldConfig[] = [
  {
    key: "name",
    label: "Name",
    type: FieldType.TEXT,
    operators: [
      "contains",
      "equals",
      "startsWith",
      "endsWith",
    ],
  },

  {
    key: "department",
    label: "Department",
    type: FieldType.SELECT,
    operators: ["equals"],

    options: [
      "Engineering",
      "HR",
      "Finance",
      "Marketing",
      "Sales",
    ],
  },

  {
    key: "salary",
    label: "Salary",
    type: FieldType.NUMBER,
    operators: [
      "greaterThan",
      "lessThan",
      "between",
    ],
  },

  {
    key: "joinDate",
    label: "Join Date",
    type: FieldType.DATE,
    operators: [
      "before",
      "after",
      "on",
    ],
  },

  {
    key: "skills",
    label: "Skills",
    type: FieldType.MULTI_SELECT,
    operators: [
      "in",
      "notIn",
    ],
    options: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "GraphQL",
      "Docker",
    ],
  },

  {
    key: "isActive",
    label: "Active",
    type: FieldType.BOOLEAN,
    operators: [
      "is",
      "isNot",
    ],
  },
];