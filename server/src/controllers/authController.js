import {
  registerService,
  loginService,
  getProfileService,
} from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const result = await registerService(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await loginService(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const result = await getProfileService(req.user.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
      const status =
        error.message === "Invalid email or password"
          ? 401
          : 500;

      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
};