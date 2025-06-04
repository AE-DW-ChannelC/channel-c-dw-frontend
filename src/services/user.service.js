import { axiosFileInstance, axiosInstance } from "../common/AxiosInstance";
import { getNextMidnightTimestamp } from "../common/common";
import { INACTIVE_EXPIRE_PERIOD } from "../common/const";
import TokenService from "./token.service";

export const UserService = {
  loginUser: async (mobile) => {
    try {
      const response = await axiosInstance.get("user-auth/login/" + mobile);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async (mobile, otp) => {
    try {
      const response = await axiosInstance.get(
        "user-auth/verify_otp/" + mobile + "/" + otp
      );
      if (response.data.jwt) {
        TokenService.setUser({
          ...response.data,
          logout: false,
          expirationPeriod: Date.now() + INACTIVE_EXPIRE_PERIOD,
          expire: getNextMidnightTimestamp(),
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, body) => {
    try {
      const response = await axiosInstance.put("users/" + id, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  uploadProfilePhoto: async (formData) => {
    try {
      const response = await axiosFileInstance.post("/upload", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
   unsubscribe: async (mobile) => { 
    try {
      const response = await axiosInstance.get("unsubscribe/" + mobile);
      return response.data;
    } catch (error) {
      throw error;
    } 
  },
  subscriptionStatus: async (mobile) => {
    try {
      const response = await axiosInstance.get("subscription/Status/" + mobile);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
