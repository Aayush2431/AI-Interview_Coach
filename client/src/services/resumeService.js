import api from "./api";

export const uploadResume = async (file) => {
  const formData = new FormData();

  // This field name must match uploadMiddleware.single("resume")
  formData.append("resume", file);

  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const resumeService = {
  uploadResume,
};

export default resumeService;