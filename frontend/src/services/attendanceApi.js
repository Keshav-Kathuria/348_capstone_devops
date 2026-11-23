import api from "./api";

// Get all attendance records
export const getAttendance = async () => {
    const response = await api.get("/attendance");
    return response.data;
};

// Mark attendance
export const markAttendance = async (attendanceData) => {
    const response = await api.post("/attendance", attendanceData);
    return response.data;
};

// Get all employees (for dropdown)
export const getEmployees = async () => {
    const response = await api.get("/employees");
    return response.data;
};