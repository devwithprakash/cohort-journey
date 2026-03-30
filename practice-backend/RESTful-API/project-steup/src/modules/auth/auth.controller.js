import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  // Frameworks like nestjs and spring create another file service.js and write actual business logic
  // Only call service here

  // Controller me sirf data aata hai or jata hai

  const user = await authService.register(req.body);
  ApiResponse.created(res, "Register success", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  ApiResponse.ok(res, "Login successful", { user, accessToken });
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  ApiResponse.ok(res, "Logout success");
};

export { register, login, logout };
