import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
      .min(8)
      .max(100)
      .required()
      .message("Password must contain 8 chars minimum")
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
    role: Joi.string().valid("customer", "seller").default("customer"),
  });
}

export default RegisterDto;
