import { Request, Response } from 'express';

import { Category } from '../../schemas/category';

export async function getAllCategories(_req: Request, res: Response) {
    const result = await Category.find();

    res.json({
        'data': result,
        'count': result.length
    });
}