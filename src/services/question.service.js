import { axiosInstance } from "../common/AxiosInstance";
import { getNextMidnightTimestamp } from "../common/common";
import { INACTIVE_EXPIRE_PERIOD } from "../common/const";
import TokenService from "./token.service";

export const QuestionService = {
  getQuestions: async (mobile) => {
    try {

      const url = `/question/random/${mobile}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyAnswer: async (mobile, answer, questionid) => {
    try {

      const url = `/question/verify/${mobile}/${answer}/${questionid}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
    cashDebit: async (mobile) => { 
    try {
      const url = `/cash-debit/${mobile}`;
      
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
