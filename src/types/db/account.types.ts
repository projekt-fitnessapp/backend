import { Document, Model, ObjectId } from 'mongoose';

export type TAccount = {
    _id: ObjectId,
    google_id: string,
    name: string,
    birthdate: string, // TODO: string oder date?
    sex: string,
    trainingPlans: [string]
}

export type AccountDocument = Document<TAccount>;

export type AccountModel = Model<AccountDocument>;