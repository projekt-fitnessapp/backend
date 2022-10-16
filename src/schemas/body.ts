import mongoose, { Schema } from 'mongoose';
import { BodyDocument, BodyModel } from '../types/db/body.types';

const BodySchema = new Schema({
    userId: { type: String, required: true },
    date: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true }
});

export const Body = mongoose.model<BodyDocument, BodyModel>('Body', BodySchema, 'bodies');