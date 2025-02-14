import { jwtDecode } from "jwt-decode";

const store = "$143dwc7491848358";

export const checkLoginExist = () => {
  return JSON.parse(localStorage.getItem(store));
};

const getToken = () => {
  return (
    JSON.parse(localStorage.getItem(store))?.jwt ||
    JSON.parse(localStorage.getItem(store))?.token
  );
};

const getTokenDetails = () => {
  if (!JSON.parse(localStorage.getItem(store))?.jwt) return null;
  const details = jwtDecode(JSON.parse(localStorage.getItem(store))?.jwt);
  return details;
};

const setUser = (user) => {
  localStorage.setItem(store, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(store);
  window.location.reload(false);
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem(store))?.data;
};

const getCampaignData = () => {
  return JSON.parse(localStorage.getItem(store))?.campaign;
};

const updateFullName = (name) => {
  let data = JSON.parse(localStorage.getItem(store));
  data.data.full_name = name;
  localStorage.setItem(store, JSON.stringify(data));
};

const updateAge = (age) => {
  let data = JSON.parse(localStorage.getItem(store));
  data.data.age = age;
  localStorage.setItem(store, JSON.stringify(data));
};

const updateMobile = (mobile) => {
  let data = JSON.parse(localStorage.getItem(store));
  data.data.mobile = mobile;
  data.data.username = mobile;
  localStorage.setItem(store, JSON.stringify(data));
};

const updateProfilePic = (profileData) => {
  let data = JSON.parse(localStorage.getItem(store));
  data.data.profile_pic = profileData;
  localStorage.setItem(store, JSON.stringify(data));
};

const updateCampaignData = (campaignData) => {
  let data = JSON.parse(localStorage.getItem(store));
  data["campaign"] = campaignData;
  localStorage.setItem(store, JSON.stringify(data));
};

const updateLeaderboardData = (leaderboardData) => {
  let data = JSON.parse(localStorage.getItem(store));
  data.data["leaderboard"] = leaderboardData;
  localStorage.setItem(store, JSON.stringify(data));
}


const TokenService = {
  getTokenDetails,
  getToken,
  getUserData,
  updateFullName,
  setUser,
  removeUser,
  updateAge,
  updateMobile,
  updateCampaignData,
  getCampaignData,
  updateLeaderboardData,
  updateProfilePic
};

export default TokenService;
