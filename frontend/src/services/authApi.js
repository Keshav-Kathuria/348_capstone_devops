import api from "./api";

// Login User
export const loginUser = async (credentials) => {
    const response = await api.post("/login", credentials);

    return response.data;
};