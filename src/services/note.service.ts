import { Note } from "../generated/prisma/client.ts";
import { NoteRepository } from "../repositories/note.repository.ts";

const noteRepository = new NoteRepository();

export class NoteService {

    async getNotes(){
        const notes = noteRepository.findAll();
        return notes;
    }
    async getNoteByTitle(title : string){
        try{
            return noteRepository.findByTitle(title);
        }catch(error){
            console.error(error);
            throw new Error('Failed to find note by title');
        }
    }
    async getNoteById(id : number){
        try{
            return noteRepository.findById(id);
        }catch(error){
            console.error(error);
            throw new Error('Failed to find note by ID');
        }
    }
    async createNote(note : Note){
        try{
            const content = note.content;
            if(!content || content.trim() === '' || content.includes('nigga')){
                throw new Error('Note content cannot be empty or contain offensive language');
            }
            return noteRepository.create(note);
        }catch(error){
            console.error(error);
            throw new Error('Failed to create note');
        }
    }
    async updateNote(id : number, note : Note){
        try {
            const existingNote = noteRepository.findById(id);
            if (!existingNote) {
                throw new Error('Note not found');
            }
            return noteRepository.update({ id, editNote: note });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update note');
        }
    }
}