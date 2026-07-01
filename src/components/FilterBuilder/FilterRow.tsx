import { IconButton, MenuItem, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import InputRenderer from "./InputRenderer";

import type {
  FilterCondition,
  FilterFieldConfig,
  FilterOperator,
} from "../../types/filter";

interface FilterRowProps {
  condition: FilterCondition;
  fields: FilterFieldConfig[];
  onChange: (condition: FilterCondition) => void;
  onDelete: () => void;
}

const FilterRow = ({
  condition,
  fields,
  onChange,
  onDelete,
}: FilterRowProps) => {
  // Selected field configuration
  const selectedField = fields.find(
    (field) => field.key === condition.field
  );

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fieldKey = event.target.value;

    const config = fields.find((field) => field.key === fieldKey);

    if (!config) return;

    onChange({
      ...condition,
      field: fieldKey,
      operator: config.operators[0],
      value: [],
    });
  };

  const handleOperatorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...condition,
      operator: event.target.value as FilterOperator,
    });
  };

  const handleValueChange = (value: unknown) => {
    onChange({
      ...condition,
      value: value as FilterCondition["value"],
    });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 2, alignItems: "center" }}
    >
      {/* Field */}
      <TextField
        select
        label="Field"
        value={condition.field}
        onChange={handleFieldChange}
        sx={{ minWidth: 180 }}
      >
        {fields.map((field) => (
          <MenuItem key={field.key} value={field.key}>
            {field.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Operator */}
      <TextField
        select
        label="Operator"
        value={condition.operator}
        onChange={handleOperatorChange}
        sx={{ minWidth: 180 }}
      >
        {selectedField?.operators.map((operator) => (
          <MenuItem key={operator} value={operator}>
            {operator}
          </MenuItem>
        ))}
      </TextField>

      {/* Value */}
      <InputRenderer
        field={selectedField}
        value={condition.value}
        onChange={handleValueChange}
      />

      {/* Delete */}
      <IconButton color="error" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default FilterRow;