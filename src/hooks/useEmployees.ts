import { useEffect, useState } from "react";
import { employeeService } from "../services/employeeService";
import type { Employee } from "../types/employee";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getEmployees();

        console.log("Employees:", data); 

        setEmployees(data);
      } catch {
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
  };
};