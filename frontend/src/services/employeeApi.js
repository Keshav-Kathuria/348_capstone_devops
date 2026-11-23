import api from "./api";

// Get All Employees
export const getEmployees = async () => {
    const response = await api.get("/employees");
    return response.data;
};

// Get Employee By ID
export const getEmployee = async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};

// Add Employee
export const addEmployee = async (employeeData) => {
    const response = await api.post("/employees", employeeData);
    return response.data;
};

// Update Employee
export const updateEmployee = async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};

// Export Employees Excel
export const exportEmployeesExcel = async () => {

    const response = await api.get(
        "/employees/export/excel",
        {
            responseType: "blob"
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "employees.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

};

// Export Employees CSV
export const exportEmployeesCSV = async () => {

    const response = await api.get(
        "/employees/export/csv",
        {
            responseType: "blob"
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "employees.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

};