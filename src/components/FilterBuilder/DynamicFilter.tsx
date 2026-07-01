import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { v4 as uuid } from "uuid";

import FilterRow from "./FilterRow";

import type {
  FilterCondition,
  FilterFieldConfig,
} from "../../types/filter";

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
  const getDefaultValue = (field: FilterFieldConfig) => {
    switch (field.type) {
      case "multiSelect":
        return [];
      case "boolean":
        return false;
      default:
        return "";
    }
  };

  const handleAddFilter = () => {
    if (fields.length === 0) return;

    const firstField = fields[0];

    const newFilter: FilterCondition = {
      id: uuid(),
      field: firstField.key,
      operator: firstField.operators[0],
      value: getDefaultValue(firstField),
    };

    onFiltersChange([...filters, newFilter]);
  };

  const handleUpdateFilter = (
    updatedFilter: FilterCondition
  ) => {
    onFiltersChange(
      filters.map((filter) =>
        filter.id === updatedFilter.id
          ? updatedFilter
          : filter
      )
    );
  };

  const handleDeleteFilter = (id: string) => {
    onFiltersChange(
      filters.filter((filter) => filter.id !== id)
    );
  };

  const handleClearFilters = () => {
    onFiltersChange([]);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "#fafafa",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <FilterAltIcon color="primary" />

            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Dynamic Filters
            </Typography>

            <Chip
              label={`${filters.length} Active`}
              color="primary"
              size="small"
            />
          </Stack>

          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Build reusable filters to quickly search employees.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={handleClearFilters}
            disabled={filters.length === 0}
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Clear All
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddFilter}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: 3,
            }}
          >
            Add Filter
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {filters.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 5,
            borderStyle: "dashed",
            textAlign: "center",
            backgroundColor: "#fcfcfc",
          }}
        >
          <FilterAltIcon
            color="disabled"
            sx={{
              fontSize: 60,
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            gutterBottom
          >
            No Filters Added
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Click the <strong>Add Filter</strong> button
            above to start filtering employees.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filters.map((filter) => (
            <Paper
              key={filter.id}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
            >
              <FilterRow
                condition={filter}
                fields={fields}
                onChange={handleUpdateFilter}
                onDelete={() =>
                  handleDeleteFilter(filter.id)
                }
              />
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default DynamicFilter;