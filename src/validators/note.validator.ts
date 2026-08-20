import {z} from 'zod';

export const noteSchema = z.object({
    params: z.object({
        id : z.coerce.number().int().positive("ID must be a positive integer"),
    }),
    body: z.object({
        title: z.string().min(1, 'Title cannot be empty').max(255,"Title must be at most 255 characters").optional(),
        content: z.string().max(1000,"Content must be at most 1000 characters").optional(),
    }),
});
export type NoteInputRequest = z.infer<typeof noteSchema>;