import { Document, Model, ObjectId } from 'mongoose';

export type TBenchmarking = {
    _id: ObjectId,
    userId: string,
    amount_of_pull_ups: number,
    amount_of_push_ups: number,
    weightlifting_weight: number,
    week_counter: number
}

export type BenchmarkingDocument = Document<TBenchmarking>;

export type BenchmarkingModel = Model<BenchmarkingDocument>;