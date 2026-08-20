import { prisma } from "../config/prisma.ts";
import { Note } from "../generated/prisma/client.ts";


export class NoteRepository{
    findAll(){
        try {
            const notes = prisma.note.findMany();
            return notes;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch notes")
        }
    }
    findByTitle(keyword : string){
        try {
            const notesFind = prisma.note.findMany({
                where:{
                    title :{
                        contains : keyword
                    }
                }
            })
            return notesFind;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to find note with keyword")
        }
    }
    findById(id : number){
        try {
            const noteFind = prisma.note.findUnique({
                where: {
                    id: id
                }
            });
            return noteFind;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to find note by ID")
        }
    }
    create(newNote : Note){
        try {
            const addNote = prisma.note.create({
                data: newNote
            });
            return addNote;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to add note")
        }
    }
    update({id , editNote} : {id : number, editNote : Note}){
        try {
            const edit = prisma.note.update({
                where:{
                    id : id
                },
                data: editNote
            })
            return edit;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to edit note with")
        }
    }
    
}