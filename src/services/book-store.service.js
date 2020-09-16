import axios from 'axios';
import { API_EndPoint } from '../utility/constant';

export const getCategoryList = async () => {
  try {
    const response = await axios.get(`${API_EndPoint}category`);
    return { result: response.data, status: response.status}
  } catch (e) {
    return { result: [], status: e.response.status}
  }
};

export const getHomePageBooks = async () => {
    try {
      const response = await axios.get(`${API_EndPoint}home`);
      return { result: response.data, status: response.status}
    } catch (e) {
      return { result: [], status: e.response.status}
    }
};

export const getSearchBooks = async (data) => {
    try {
      const response = await axios.post(`${API_EndPoint}common`,data);
      return { result: response.data, status: response.status}
    } catch (e) {
      return { result: [], status: e.response.status}
    }
};
  