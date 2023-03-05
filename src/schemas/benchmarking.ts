import mongoose, { Schema } from 'mongoose';
import { BenchmarkingDocument, BenchmarkingModel } from '../types/db/benchmarking.types';

const BenchmarkingSchema = new Schema({
    userId: { type: String, required: true },
    date: { type: Number, default: Date.now() },
    exercise_amount: { type: Number, required: true },
    exercise_name: { type: String, required: true },
    week_counter: { type: Number, required: false }
});

export const Benchmarking = mongoose.model<BenchmarkingDocument, BenchmarkingModel>('Benchmarking', BenchmarkingSchema, 'benchmarking');
