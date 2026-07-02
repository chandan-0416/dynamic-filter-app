import { Button, Paper, Stack, Typography } from "@mui/material";
import FilterRow from "./FilterRow";
import { v4 as uuid } from "uuid";
import type {FilterCondition,FilterFieldConfig,} from "../../types/filter";


interface DynamicFilterProps {
  fields: FilterFieldConfig[];
  filters: FilterCondition[];
  onFiltersChange: (filters: FilterCondition[]) => void;
}

const DynamicFilter = ({
  fields,
  filters,
  onFiltersChange,
}: DynamicFilterProps) => {
  
  // Add new filter row
  const handleAddFilter = () => {
    if (fields.length === 0) return;

    const firstField = fields[0];

    const newFilter: FilterCondition = {
      id: uuid(),
      field: firstField.key,
      operator: firstField.operators[0],
      value: [],
    };

    onFiltersChange([...filters, newFilter]);
  };

  // Update one filter
  const handleUpdateFilter = (
    updatedFilter: FilterCondition
  ) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === updatedFilter.id
        ? updatedFilter
        : filter
    );

    onFiltersChange(updatedFilters);
  };

  // Delete filter
  const handleDeleteFilter = (id: string) => {
    const updatedFilters = filters.filter(
      (filter) => filter.id !== id
    );

    onFiltersChange(updatedFilters);
  };

  // Clear all filters
  const handleClearAll = () => {
    onFiltersChange([]);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h6">
          Dynamic Filters
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
          >
            Clear All
          </Button>

          <Button
            variant="contained"
            // startIcon={<AddIcon />}
            onClick={handleAddFilter}
          >
            Add Filter
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        {filters.map((filter) => (
          <FilterRow
            key={filter.id}
            condition={filter}
            fields={fields}
            onChange={handleUpdateFilter}
            onDelete={() => handleDeleteFilter(filter.id)}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default DynamicFilter;