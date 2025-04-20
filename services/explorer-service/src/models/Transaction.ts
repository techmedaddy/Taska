import { Schema, model, Document } from 'mongoose';

export interface TransactionDocument extends Document {
  txHash: string;
  from: string;
  to: string;
  amount: number;
  blockHash: string;
  timestamp: Date;
}

const TransactionSchema = new Schema<TransactionDocument>({
  txHash: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  blockHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model<TransactionDocument>('Transaction', TransactionSchema);
