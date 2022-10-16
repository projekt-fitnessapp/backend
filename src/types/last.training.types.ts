import { Document, Model } from 'mongoose';

export type TLastTraining = {
    date: string,
    trained: boolean
}

export type LastTrainingDocument = Document<TLastTraining>;

export type LastTrainingModel = Model<LastTrainingDocument>;