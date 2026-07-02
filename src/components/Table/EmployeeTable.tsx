import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Employee } from "../../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  totalEmployees: number;
}

const EmployeeTable = ({
  employees,
  totalEmployees,
}: EmployeeTableProps) => {
  if (employees.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          mt: 3,
          p: { xs: 3, md: 5 },
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          No employees found
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Try changing your filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Header */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          p: { xs: 2, md: 3 },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Employee Directory
        </Typography>

        <Typography color="text.secondary">
          Showing <strong>{employees.length}</strong> of{" "}
          <strong>{totalEmployees}</strong> employees
        </Typography>
      </Stack>

      {/* Responsive Table */}

      <TableContainer
        sx={{
          overflowX: "auto",
        }}
      >
        <Table
          sx={{
            minWidth: 1250,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Name
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Email
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Department
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Role
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Salary
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Join Date
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Active
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Projects
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Rating
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                Skills
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#fafafa",
                  },
                }}
              >
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.name}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.email}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.department}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.role}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  ₹{employee.salary.toLocaleString()}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.joinDate}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Chip
                    label={
                      employee.isActive
                        ? "Active"
                        : "Inactive"
                    }
                    color={
                      employee.isActive
                        ? "success"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.projects}
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {employee.performanceRating}
                </TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    useFlexGap
                    sx={{
                      flexWrap: "wrap",
                      minWidth: 180,
                    }}
                  >
                    {employee.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EmployeeTable;