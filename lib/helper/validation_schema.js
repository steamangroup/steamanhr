import Joi from "joi";

const authSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
  confirmPassword: Joi.ref("password"),
});

export default authSchema;
