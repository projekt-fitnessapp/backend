import { Document, Model, ObjectId } from 'mongoose';

export type TBenchmarking = {
    _id: ObjectId,
    userId: string,
    date: Date,
    exercise_amount: number,
    exercise_name: string,
    week_counter: number
}

export type BenchmarkingDocument = Document<TBenchmarking>;

export type BenchmarkingModel = Model<BenchmarkingDocument>;
