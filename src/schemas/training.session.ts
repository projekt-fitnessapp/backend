import mongoose, { Schema } from 'mongoose';
import { TrainingSessionDocument, TrainingSessionModel } from '../types/db/training.session.types';

const TrainingSessionSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true},
    userId: { type: String, required: true},
    trainingDayId: { type: String, required: true},
    date: { type: String, required: true}, // TODO: String oder Date?
    executions: { type: [{excercise: { type: {
        _id: mongoose.Types.ObjectId,
        name: String,
        instruction: String,
        gifUrl: String,
        muscle: String,
        equipment: String
    }, required: true },
    notes: { type: [String], default: [] },
    sets: { type: {
        executionType: String, // TODO: Wie bekomme ich hier ein Enum hinein?
        weight: Number, // TODO: Minimum?
        reps: Number,
        tenRM: Number // TODO: Kann so nicht heißen (10RM)
    }, required: true}}] }
});

export const TrainingSession = mongoose.model<TrainingSessionDocument, TrainingSessionModel>('Training Session', TrainingSessionSchema, 'training sessions');