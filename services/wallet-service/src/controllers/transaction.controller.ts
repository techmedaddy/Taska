import { Request, Response } from "express";
import { processTransaction } from "../services/transaction.service";

export const handleTransaction = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, amount } = req.body; // Extract data from request body

    if (!senderId || !receiverId || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const transaction = await processTransaction(senderId, receiverId, amount);

    return res.status(201).json({ success: true, transaction });
  } catch (error: any) {
    console.error("❌ Error processing transaction:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ **Function to allow calling `handleTransaction` directly from Kafka Consumer**
export const handleTransactionDirectly = async (transactionData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Mock Express.js request and response objects
    const mockReq = { body: transactionData } as Request;
    const mockRes = {
      status: (statusCode: number) => ({
        json: (response: any) => {
          if (statusCode >= 400) {
            reject(response);
          } else {
            resolve(response);
          }
        },
      }),
    } as unknown as Response;

    handleTransaction(mockReq, mockRes);
  });
};
