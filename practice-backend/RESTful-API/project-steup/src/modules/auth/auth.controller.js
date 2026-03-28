import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  // Frameworks like nestjs and spring create another file service.js and write actual business logic
  // Only call service here

  // Controller me sirf data aata hai or jata hai

  const user = await authService.register(req.body);
  ApiResponse.created(res, "Register success", user);

};

export { register };
