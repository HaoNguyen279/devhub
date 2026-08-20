import { Request, Response } from "express";
import { NoteService } from "../services/note.service.ts";

const noteService = new NoteService();
export class NoteController {
    async getNotes(req: Request, res: Response) {
        try {
            const notes = await noteService.getNotes();
            return res.status(200).json(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            return res.status(500).json({ message: 'Error fetching notes' });
        }
    }
    async getNoteByTitle(req: Request<{title : string}>, res: Response) {
        const { title } = req.params;
        try {
            const note = await noteService.getNoteByTitle(title);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            return res.status(200).json(note);
        } catch (error) {
            console.error('Error fetching note by title:', error);
            return res.status(500).json({ message: 'Error fetching note by title' });
        }
    }
    async createNote(req: Request, res: Response) {
        const note = req.body;
        try {
            const createdNote = await noteService.createNote(note);
            return res.status(201).json(createdNote);
        }
        catch (error) {
            console.error('Error creating note:', error);
            return res.status(500).json({ message: 'Error creating note' });
        }
    }
    async updateNote(req: Request, res: Response) {
        const { id } = req.params as unknown as {id : number};
        const note = req.body;
        try {
            const updatedNote = await noteService.updateNote(id, note);
            if (!updatedNote) {
                return res.status(404).json({ message: 'Note not found' });
            }
            return res.status(200).json(updatedNote);
        }
        catch (error) {
            console.error('Error updating note:', error);
            return res.status(500).json({ message: 'Error updating note' });
        }
    }
}