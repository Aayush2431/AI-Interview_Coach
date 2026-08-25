import api from "./api";

const atsService = {
  getATSReport: async (resumeId) => {
    const response = await api.get(
      `/resume/ats/${resumeId}`
    );

    return response.data;
  },
};

export default atsService;