import { sendVerificationEmail } from "../../common/config/email.js";
import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
};

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) throw ApiError.conflict("Email already registered");

  const { rawToken, hashedToken } = generateResetToken();
  //     user get  |  DB stores

  const user = await User.create({
    name,
    email,
    password,
    role,
    verifiedToken: hashedToken,
  });

  try {
    await sendVerificationEmail(email, rawToken);
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
  }

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.verifiedToken;

  return userObj;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  if (!user.isVerified)
    throw ApiError.forbidden("Please verify email before login");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);

  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh token missing");

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user) throw ApiError.unauthorized("User not found");

  if (user.refreshToken !== hashToken(token))
    throw ApiError.unauthorized("Invalif refresh token");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notfound("No account with that email");

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  // send email to user
};

export { register, login, refresh, logout, forgotPassword };
