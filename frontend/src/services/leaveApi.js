import api from "./api";

// Get all leave requests
export const getLeaves = async () => {
  const response = await api.get("/leave");
  return response.data;
};

// Apply leave
export const applyLeave = async (leaveData) => {
  const response = await api.post("/leave", leaveData);
  return response.data;
};

// Update leave status
export const updateLeave = async (id, status) => {
  const response = await api.put(`/leave/${id}`, {
    status,
  });

  return response.data;
};

// Delete leave
export const deleteLeave = async (id) => {
  const response = await api.delete(`/leave/${id}`);
  return response.data;
};

// Load employees for dropdown
export const getEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};