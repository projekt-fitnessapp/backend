import mongoose, { Schema } from 'mongoose';
import { AccountDocument, AccountModel } from '../types/db/account.types';

const AccountSchema = new Schema({
    google_id: { type: String, required: true },
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    sex: { type: String, enum: ['male', 'female'], required: false },
    trainingPlans: { type: [String], default: [] }
});

export const Account = mongoose.model<AccountDocument, AccountModel>('Account', AccountSchema, 'accounts');