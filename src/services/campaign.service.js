import { axiosInstance } from "../common/AxiosInstance";

export const CampaignService = {
  getCampaigns: async () => {
    try {
      const today = new Date().toISOString();

      const url = `/campaigns?filters[start_date_time][$lte]=${today}&filters[end_date_time][$gte]=${today}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getWinners: async () => {
    try {
      const url = `/campaigns?populate=winner.profile_pic&populate=gift_image&filters[winner][$notNull]=true`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
