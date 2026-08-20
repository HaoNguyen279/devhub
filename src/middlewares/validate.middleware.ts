import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod";


export const validate = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parseAsync({
                params: req.params,
                body: req.body,
                query: req.query
            });
            req.params = parsed.params;
            req.body = parsed.body;
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: error.flatten().fieldErrors,
                });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}