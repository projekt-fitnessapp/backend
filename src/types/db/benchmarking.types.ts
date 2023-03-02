import { Document, Model, ObjectId } from 'mongoose';

export type TBenchmarking = {
    _id: ObjectId,
    userId: string,
    exercise_one_amount: number,
    exercise_one_name: string,
    exercise_two_amount: number,
    exercise_two_name: string,
    exercise_three_amount: number,
    exercise_three_name: string,
    week_counter: number
}

export type BenchmarkingDocument = Document<TBenchmarking>;

export type BenchmarkingModel = Model<BenchmarkingDocument>;
