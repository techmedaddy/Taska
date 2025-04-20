import { Schema, model, Document } from 'mongoose';

export interface WalletDocument extends Document {
  address: string;
  balance: number;
  transactions: string[]; // array of transaction hashes
}

const WalletSchema = new Schema<WalletDocument>({
  address: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: [{ type: String, ref: 'Transaction' }],
});

export default model<WalletDocument>('Wallet', WalletSchema);
