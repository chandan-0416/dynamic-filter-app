import { useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import DynamicFilter from "../components/FilterBuilder/DynamicFilter";
import EmployeeTable from "../components/Table/EmployeeTable";

import { useEmployees } from "../hooks/useEmployees";
import { useFilteredData } from "../hooks/useFilteredData";

import { employeeFilterConfig } from "../config/employeeFilterConfig";

import type { FilterCondition } from "../types/filter";

const EmployeePage = () => {
  const { employees, loading, error } = useEmployees();

  const [filters, setFilters] = useState<FilterCondition[]>([]);

  const filteredEmployees = useFilteredData(
    employees,
    filters
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={55} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        py: 5,
      }}
    >
      <Container maxWidth="xl">

        {/* ================= HEADER ================= */}

        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#1976d2,#42a5f5)",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Dynamic Filter Component System
          </Typography>

          <Typography variant="h6">
            Dynamic, reusable and configuration-driven
            employee filtering system.
          </Typography>
        </Paper>

        {/* ================= STATISTICS ================= */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Total Employees
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  {employees.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Filtered Employees
                </Typography>

                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {filteredEmployees.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Active Filters
                </Typography>

                <Typography
                  variant="h4"
                  color="success.main"
                  sx={{ fontWeight: "bold" }}
                >
                  {filters.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ================= FILTER ================= */}

        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
          }}
        >
          <DynamicFilter
            fields={employeeFilterConfig}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </Paper>

        {/* ================= TABLE ================= */}

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Employees
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Showing{" "}
            <strong>{filteredEmployees.length}</strong> of{" "}
            <strong>{employees.length}</strong> employees
          </Typography>

          <EmployeeTable
            employees={filteredEmployees}
            totalEmployees={filteredEmployees.length}
          />
        </Paper>

      </Container>
    </Box>
  );
};

export default EmployeePage;