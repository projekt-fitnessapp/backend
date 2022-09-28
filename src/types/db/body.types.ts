import { Document, Model, ObjectId } from 'mongoose';

export type TBody = {
    _id: ObjectId,
    userId: string,
    date: string, // String oder date?
    height: number,
    weight: number
}

export type BodyDocument = Document<TBody>;

export type BodyModel = Model<BodyDocument>;