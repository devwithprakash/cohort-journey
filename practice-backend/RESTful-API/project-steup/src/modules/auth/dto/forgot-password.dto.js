import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class ForgotPasswordDto extends BaseDto {
  static schema = Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .max(254)
      .required(),
  });
}

export default ForgotPasswordDto;
