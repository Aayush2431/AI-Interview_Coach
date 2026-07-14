import api from "./api";

const getATSReport = async (resumeId) => {
  const response = await api.get(`/resume/ats/${resumeId}`);

  return response.data;
};

const atsService = {
  getATSReport,
};

export default atsService;