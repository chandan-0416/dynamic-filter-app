import type { Employee } from "../types/employee";

const API_URL = "/mock/employees.json";

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch employees.");
    }

    const employees: Employee[] = await response.json();

    return employees;
  },
};