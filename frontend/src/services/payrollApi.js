import api from "./api";

// Get all payrolls
export const getPayrolls = async () => {
    const response = await api.get("/payroll");
    return response.data;
};

// Generate payroll
export const generatePayroll = async (payrollData) => {
    const response = await api.post("/payroll", payrollData);
    return response.data;
};

// Delete payroll
export const deletePayroll = async (id) => {
    const response = await api.delete(`/payroll/${id}`);
    return response.data;
};

// Get all employees
export const getEmployees = async () => {
    const response = await api.get("/employees");
    return response.data;
};

// Download Payslip PDF
export const downloadPayslip = async (id) => {

    const response = await api.get(`/payroll/${id}/pdf`, {

        responseType: "blob"

    });

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
        "download",
        `Payslip_${id}.pdf`
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
};