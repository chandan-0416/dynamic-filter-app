import { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import DynamicFilter from "../components/FilterBuilder/DynamicFilter";
import EmployeeTable from "../components/Table/EmployeeTable";

import { useEmployees } from "../hooks/useEmployees";
import { useFilteredData } from "../hooks/useFilteredData";

import { employeeFilterConfig } from "../config/employeeFilterConfig";

import type { FilterCondition } from "../types/filter";

const EmployeePage = () => {
  const {
    employees,
    loading,
    error,
  } = useEmployees();

  const [filters, setFilters] = useState<FilterCondition[]>([]);

  const filteredEmployees = useFilteredData(
    employees,
    filters
  );

  const totalEmployees = filteredEmployees.length;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Employee Management System
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Dynamic Employee Filtering Demo
      </Typography>

      <DynamicFilter
        fields={employeeFilterConfig}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <EmployeeTable
        employees={filteredEmployees}
        totalEmployees={totalEmployees}
      />

    </Container>
  );
};

export default EmployeePage;