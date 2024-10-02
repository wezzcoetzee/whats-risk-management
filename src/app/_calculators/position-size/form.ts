import { z } from "zod";

const positionCalculatorSchema = z
  .object({
    entryPrice: z.coerce
      .number({
        required_error: "entry price is required",
        invalid_type_error: "entry price must be a number",
      })
      .refine((val) => val > 0, {
        message: "entry price must be greater than 0",
      }),
    stopLoss: z.coerce
      .number({
        required_error: "stop loss is required",
        invalid_type_error: "stop loss must be a number",
      })
      .refine((val) => val > 0, {
        message: "stop loss must be greater than 0",
      }),
    riskAmount: z.coerce
      .number({
        required_error: "risk amount is required",
        invalid_type_error: "risk amount must be a number",
      })
      .refine((val) => val > 0, {
        message: "risk amount must be greater than 0",
      }),
    leverage: z.coerce
      .number({
        required_error: "leverage is required",
        invalid_type_error: "leverage must be a number",
      })
      .refine((val) => val > 0, {
        message: "leaverage amount must be greater than 0",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.entryPrice === data.stopLoss)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `entry price and stop loss cannot be the same`,
        path: ["entryPrice", "stopLoss"],
      });
  });

type PositionCalculatorInput = z.infer<typeof positionCalculatorSchema>;

const developmentFormValues: PositionCalculatorInput = {
  entryPrice: 55000,
  stopLoss: 54000,
  riskAmount: 100,
  leverage: 10,
};

const defaultFormValues: PositionCalculatorInput = {
  entryPrice: 0,
  stopLoss: 0,
  riskAmount: 0,
  leverage: 1,
};

export {
  developmentFormValues,
  defaultFormValues,
  type PositionCalculatorInput,
  positionCalculatorSchema,
};
