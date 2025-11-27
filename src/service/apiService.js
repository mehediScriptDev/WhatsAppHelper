import axiosInstance from "../config/axiosInstance";



export const get = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response;
  } catch (error) {
    console.error(`Error in GET request to ${endpoint}:`, error);
    throw error;
  }
};


export const post = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response;
  } catch (error) {
    console.error(`Error in POST request to ${endpoint}:`, error);
    throw error;
  }
};


export const put = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response;
  } catch (error) {
    console.error(`Error in PUT request to ${endpoint}:`, error);
    throw error;
  }
};


export const del = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response;
  } catch (error) {
    console.error(`Error in DELETE request to ${endpoint}:`, error);
    throw error;
  }
};


export const patch = async (endpoint, data) => {
  try {
    const response = await axiosInstance.patch(endpoint, data);
    return response;
  } catch (error) {
    console.error(`Error in PATCH request to ${endpoint}:`, error);
    throw error;
  }
};