import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto";

class LoginDto extends BaseDto {
  static schema = Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .max(254)
      .required(),
    password: Joi.string()
      .min(8)
      .max(64)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      .required(),
  });
}

export default LoginDto;
