import Joi from "joi";

class BaseDto {
  static schema = Joi.object({}); // schema will overwrite wherever we need it

  static validate(data) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: false,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);

      return { errors, value: null };
    }

    return { errors: null, value };
  }
}

export default BaseDto;
