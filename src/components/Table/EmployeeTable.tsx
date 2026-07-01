import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
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
      <Paper sx={{ mt: 3, p: 4, textAlign: "center" }}>
        <Typography variant="h6">
          No employees found
        </Typography>

        <Typography color="text.secondary">
          Try changing your filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 3 }}>
      <Stack
        direction="row"
        sx={{ p: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6">
          Employee Directory
        </Typography>

        <Typography color="text.secondary">
          Showing {employees.length} of {totalEmployees} employees
        </Typography>
      </Stack>

      <TableContainer>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Projects</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Skills</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} hover>

                <TableCell>{employee.name}</TableCell>

                <TableCell>{employee.email}</TableCell>

                <TableCell>{employee.department}</TableCell>

                <TableCell>{employee.role}</TableCell>

                <TableCell>
                  ₹{employee.salary.toLocaleString()}
                </TableCell>

                <TableCell>{employee.joinDate}</TableCell>

                <TableCell>
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

                <TableCell>
                  {employee.projects}
                </TableCell>

                <TableCell>
                  {employee.performanceRating}
                </TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap" }}
                  >
                    {employee.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ mb: 0.5 }}
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