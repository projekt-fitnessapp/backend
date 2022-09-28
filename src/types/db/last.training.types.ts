import { Document, Model } from 'mongoose';

export type TLastTraining = {
    date: string, // TODO: Oder Date?
    trained: boolean
}

export type LastTrainingDocument = Document<TLastTraining>;

export type LastTrainingModel = Model<LastTrainingDocument>;