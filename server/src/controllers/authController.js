import {
  registerService,
  loginService,
} from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const result = await registerService(req.body);

    res.status(201).json(result);
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

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};