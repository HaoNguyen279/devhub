import Router from "express";
import { NoteController } from "../controllers/note.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { noteSchema } from "../validators/note.validator.ts";

const noteController = new NoteController();
const router = Router();

router.get('/', noteController.getNotes.bind(noteController));
// đăng ký route / trước khi đăng ký route /:title để tránh xung đột
router.get('/:title', noteController.getNoteByTitle.bind(noteController));
router.post('/', validate(noteSchema), noteController.createNote.bind(noteController));
router.put('/:id', validate(noteSchema), noteController.updateNote.bind(noteController));

export default router;