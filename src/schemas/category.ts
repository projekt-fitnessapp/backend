import mongoose, { Schema } from 'mongoose';
import { CategoryDocument, CategoryModel } from '../types/db/category.types';

const CategorySchema = new Schema({
    name: { type: String, required: true },
    sku: { type: Number, default: null }
});

console.log("Hello")

export const Category = mongoose.model<CategoryDocument, CategoryModel>('Category', CategorySchema, 'categories');