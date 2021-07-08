import axios from 'axios';
import { API_EndPoint, STUDY_API_EndPoint } from '../utility/constant';

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
  

/* -----------------------------------  Study Material  --------------------------------- */

export const getStudyMaterialCategory = async () => {
  try {
    const response = await axios.get(`${STUDY_API_EndPoint}cat`);
    return { result: response.data, status: response.status}
  } catch (e) {
    return { result: [], status: e.response.status}
  }
};

export const getStudyMaterialSubCategory = async (data) => {
  try {
    const response = await axios.post(`${STUDY_API_EndPoint}sub-cat`, data);
    return { result: response.data, status: response.status}
  } catch (e) {
    return { result: [], status: e.response.status}
  }
};

export const getSearchStudyMaterialBooks = async (data) => {
  try {
    const response = await axios.post(`${STUDY_API_EndPoint}common`,data);
    return { result: response.data, status: response.status}
  } catch (e) {
    return { result: [], status: e.response.status}
  }
};
