import { body, param } from "express-validator";

/**
 * Validate blockchain transaction inputs.
 */
export const transactionValidation = [
    body("sender").isString().withMessage("Sender must be a string"),
    body("receiver").isString().withMessage("Receiver must be a string"),
    body("amount").isNumeric().withMessage("Amount must be a valid number")
];

/**
 * Validate block ID for fetching blocks.
 */
export const blockValidation = [
    param("blockId").isString().withMessage("Block ID must be a string")
];
