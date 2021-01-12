import axios from 'axios';

export const requestWakatimeStats = async (username) => {
  const { data: axiosData } = await axios.get(
    `https://wakatime.com/api/v1/users/${username}/stats/last_7_days`
  );
  return axiosData?.data;
};
