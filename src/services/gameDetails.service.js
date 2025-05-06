import { axiosInstance } from "../common/AxiosInstance";

export const GameDetails = {

    getGameDetails: async () => {
        try {
            const response = await axiosInstance.get("/game-details");
            return response.data;

        } catch (error) {
            throw error;
        }
    }

}