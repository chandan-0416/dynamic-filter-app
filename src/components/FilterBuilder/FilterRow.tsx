import {Box, IconButton, MenuItem, Stack, TextField,} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InputRenderer from "./InputRenderer";
import { FieldType } from "../../types/filter";
import type {FilterCondition, FilterFieldConfig, FilterOperator,} from "../../types/filter";

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

    const config = fields.find(
      (field) => field.key === fieldKey
    );

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
    const operator =
      event.target.value as FilterOperator;

    let value: FilterCondition["value"] = "";

    if (
      selectedField?.type === FieldType.NUMBER &&
      operator === "between"
    ) {
      value = {
        min: "",
        max: "",
      };
    } else if (
      selectedField?.type === FieldType.DATE &&
      operator === "between"
    ) {
      value = {
        from: "",
        to: "",
      };
    } else if (
      selectedField?.type ===
      FieldType.MULTI_SELECT
    ) {
      value = [];
    }

    onChange({
      ...condition,
      operator,
      value,
    });
  };

  const handleValueChange = (
    value: unknown
  ) => {
    onChange({
      ...condition,
      value: value as FilterCondition["value"],
    });
  };

  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      sx={{
        width: "100%",
        alignItems: {
          xs: "stretch",
          md: "center",
        },
      }}
    >
      {/* Field */}
      <TextField
        select
        label="Field"
        value={condition.field}
        onChange={handleFieldChange}
        fullWidth
        sx={{
          flex: 1,
          minWidth: {
            md: 180,
          },
        }}
      >
        {fields.map((field) => (
          <MenuItem
            key={field.key}
            value={field.key}
          >
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
        fullWidth
        sx={{
          flex: 1,
          minWidth: {
            md: 180,
          },
        }}
      >
        {selectedField?.operators.map(
          (operator) => (
            <MenuItem
              key={operator}
              value={operator}
            >
              {operator}
            </MenuItem>
          )
        )}
      </TextField>

      {/* Value */}
      <Box
        sx={{
          flex: 2,
          width: "100%",
        }}
      >
        <InputRenderer
          field={selectedField}
          operator={condition.operator}
          value={condition.value}
          onChange={handleValueChange}
        />
      </Box>

      {/* Delete */}
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "flex-end",
            md: "center",
          },
          alignItems: "center",
        }}
      >
        <IconButton
          color="error"
          onClick={onDelete}
          sx={{
            border: "1px solid",
            borderColor: "error.light",
            bgcolor: "error.50",
            "&:hover": {
              bgcolor: "error.100",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default FilterRow;