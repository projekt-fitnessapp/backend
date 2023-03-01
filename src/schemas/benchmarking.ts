import mongoose, { Schema } from 'mongoose';
import { BenchmarkingDocument, BenchmarkingModel } from '../types/db/benchmarking.types';

const BenchmarkingSchema = new Schema({
    userId: { type: String, required: true },
    amount_of_pull_ups: { type: Number, required: true },
    amount_of_push_ups: { type: Number, required: true },
    weightlifting_weight: { type: Number, required: true },
    week_counter: { type: Number, required: true }
});

export const Benchmarking = mongoose.model<BenchmarkingDocument, BenchmarkingModel>('Benchmarking', BenchmarkingSchema, 'benchmarking');