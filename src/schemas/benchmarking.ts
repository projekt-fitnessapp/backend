import mongoose, { Schema } from 'mongoose';
import { BenchmarkingDocument, BenchmarkingModel } from '../types/db/benchmarking.types';

const BenchmarkingSchema = new Schema({
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    exercise_one_amount: { type: Number, required: true },
    exercise_one_name: { type: String, required: true },
    exercise_two_amount: { type: Number, required: false },
    exercise_two_name: { type: String, required: false },
    exercise_three_amount: { type: Number, required: false },
    exercise_three_name: { type: String, required: false },
    week_counter: { type: Number, required: true }
});

export const Benchmarking = mongoose.model<BenchmarkingDocument, BenchmarkingModel>('Benchmarking', BenchmarkingSchema, 'benchmarking');
