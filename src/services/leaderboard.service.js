import { axiosInstance } from "../common/AxiosInstance";
import { getNextMidnightTimestamp } from "../common/common";
import { INACTIVE_EXPIRE_PERIOD } from "../common/const";
import TokenService from "./token.service";

export const LeaderboardService = {
  createLeaderboard: async (body) => {
    try {
      const url = `/leaderboards`;

      const response = await axiosInstance.post(url, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateLeaderboard: async (body) => {
    try {
      const url = `/leaderboard/update`;

      const response = await axiosInstance.post(url, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserCampaignLeaderboard: async (userid, campaignId) => {
    try {
      const url = `/leaderboards?populate=user.profile_pic&filters[user][$eq]=${userid}&filters[campaign][$eq]=${campaignId}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getHighstUserScores: async (campaignId) => {
    try {
      const url = `/leaderboards?populate=user.profile_pic&filters[campaign][$eq]=${campaignId}&sort[0]=score:desc&limit=3`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
