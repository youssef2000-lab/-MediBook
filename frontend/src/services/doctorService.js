import api from './api';

export const doctorService = {
  getAllDoctors: async () => {
    const response = await api.get('/doctors');
    return response.data;
  },

  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  searchDoctors: async (query) => {
    const response = await api.get(`/doctors/search?q=${query}`);
    return response.data;
  },

  getDoctorsBySpecialty: async (specialty) => {
    const response = await api.get(`/doctors/specialty/${specialty}`);
    return response.data;
  },
};

export default doctorService;

