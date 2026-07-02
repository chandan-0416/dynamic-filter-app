import { useState } from "react";
import {Alert, Box, Card, CardContent, CircularProgress, Container, Grid, Paper, Typography,} from "@mui/material";
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
        py: {
          xs: 2,
          sm: 3,
          md: 5,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/*HEADER */}

        <Paper
          elevation={4}
          sx={{
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            mb: 4,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#1976d2,#42a5f5)",
            color: "white",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "2rem",
                sm: "2.4rem",
                md: "3rem",
              },
            }}
            gutterBottom
          >
            Employee Management Dashboard
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
            }}
          >
            Dynamic, reusable and configuration-driven employee
            filtering system.
          </Typography>
        </Paper>

        <Grid
          container
          spacing={{
            xs: 2,
            sm: 3,
          }}
          sx={{ mb: 4 }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Total Employees
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "2rem",
                      md: "2.4rem",
                    },
                  }}
                >
                  {employees.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Filtered Employees
                </Typography>

                <Typography
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "2rem",
                      md: "2.4rem",
                    },
                  }}
                >
                  {filteredEmployees.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Active Filters
                </Typography>

                <Typography
                  color="success.main"
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "2rem",
                      md: "2.4rem",
                    },
                  }}
                >
                  {filters.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/*FILTER */}

        <Paper
          elevation={3}
          sx={{
            p: {
              xs: 2,
              sm: 3,
            },
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

        {/*TABLE */}

        <Paper
          elevation={3}
          sx={{
            p: {
              xs: 2,
              sm: 3,
            },
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.4rem",
                sm: "1.7rem",
                md: "2rem",
              },
            }}
            gutterBottom
          >
            Employees
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3,
              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
              },
            }}
          >
            Showing{" "}
            <strong>{filteredEmployees.length}</strong> of{" "}
            <strong>{employees.length}</strong> employees
          </Typography>

          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <EmployeeTable
              employees={filteredEmployees}
              totalEmployees={filteredEmployees.length}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmployeePage;