import api from "./api";

export const getChartData = async () => {

    const response = await api.get("/dashboard/charts");

    return response.data;

};