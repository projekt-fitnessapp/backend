import { Document, Model, ObjectId } from 'mongoose';

export type TBody = {
    _id: ObjectId,
    userId: string,
    date: string,
    height: number,
    weight: number
}

export type BodyDocument = Document<TBody>;

export type BodyModel = Model<BodyDocument>;