import { Response } from "express";

export class ErrorHandler {
  static handleError(err: any, res: Response) {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}
