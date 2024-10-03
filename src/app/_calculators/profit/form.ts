import { z } from "zod";

const profitCalculatorSchema = z
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
    effectivePositionSize: z.coerce
      .number({
        required_error: "position size is required",
        invalid_type_error: "position size must be a number",
      })
      .refine((val) => val > 0, {
        message: "position size must be greater than 0",
      }),
    leverage: z.coerce
      .number({
        required_error: "leverage is required",
        invalid_type_error: "leverage must be a number",
      })
      .refine((val) => val > 0, {
        message: "leverage amount must be greater than 0",
      }),
    takeProfitLevels: z
      .array(
        z.coerce
          .number({
            required_error: "take profit is required",
            invalid_type_error: "take profit must be a number",
          })
          .refine((val) => val > 0, {
            message: "take profit amount must be greater than 0",
          })
      )
      .max(4),
  })
  .superRefine((data, ctx) => {
    if (data.entryPrice === data.stopLoss)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `entry price and stop loss cannot be the same`,
        path: ["entryPrice", "stopLoss"],
      });
  });

type ProfitCalculatorInput = z.infer<typeof profitCalculatorSchema>;

const developmentFormValues: ProfitCalculatorInput = {
  entryPrice: 55000,
  stopLoss: 54000,
  effectivePositionSize: 1000,
  leverage: 10,
  takeProfitLevels: [59000, 62000, 69000, 72420],
};

const defaultFormValues: ProfitCalculatorInput = {
  entryPrice: 0,
  stopLoss: 0,
  effectivePositionSize: 0,
  leverage: 1,
  takeProfitLevels: [0],
};

const formFields = [
  [
    {
      name: "entryPrice",
      title: "entry price",
      description: "the price at which you will enter the trade.",
    },
    {
      name: "stopLoss",
      title: "stop loss",
      description:
        "the price at which you will exit the trade if the trade goes against you.",
    },
  ],
  [
    {
      name: "effectivePositionSize",
      title: "position size",
      description: "the amount you are willing to risk/lose on this trade.",
    },
    {
      name: "leverage",
      title: "leaverage amount",
      description:
        "leverage is the use of borrowed capital or debt to increase the potential return on investment.",
    },
  ],
];

export {
  developmentFormValues,
  defaultFormValues,
  type ProfitCalculatorInput,
  profitCalculatorSchema,
  formFields,
};
