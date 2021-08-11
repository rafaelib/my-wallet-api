import joi from "joi";

const newTransactionSchema = joi.object({
  amount: joi.number().required(),
  type: joi.string().required(),
  description: joi.string().min(3).required(),
});
export default newTransactionSchema;
