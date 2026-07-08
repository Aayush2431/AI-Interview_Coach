export const registerService = async (userData) => {
  return {
    success: true,
    message: "Registration service executed successfully.",
    data: userData,
  };
};

export const loginService = async (credentials) => {
  return {
    success: true,
    message: "Login service executed successfully.",
    data: credentials,
  };
};