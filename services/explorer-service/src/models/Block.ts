import { Schema, model, Document } from 'mongoose';

export interface BlockDocument extends Document {
  blockNumber: number;
  hash: string;
  previousHash: string;
  timestamp: Date;
  transactions: string[]; // array of transaction hashes
}

const BlockSchema = new Schema<BlockDocument>({
  blockNumber: { type: Number, required: true, unique: true },
  hash: { type: String, required: true, unique: true },
  previousHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  transactions: [{ type: String, ref: 'Transaction' }],
});

export default model<BlockDocument>('Block', BlockSchema);