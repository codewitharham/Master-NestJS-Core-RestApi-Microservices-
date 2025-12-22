import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {

    private vault = [
        { id: 1, content: 'The secret code is 1234', owner: 'admin' },
        { id: 2, content: 'My bank password is "fluffy"', owner: 'user1' }
    ]

    // Service methods would go here

    getVault() {
        return this.vault;
    }

    setVault(newVault) {
        this.vault = newVault;
    }

    findNoteById(id: number) {
        return this.vault.find(note => note.id === id);
    }

    findNotesByOwner(owner: string) {
        return this.vault.filter(note => note.owner === owner);
    }

    deleteNoteById(id: number) {
        this.vault = this.vault.filter(note => note.id !== id);
    }

    updateNoteById(id: number, content: string) {
        const note = this.findNoteById(id);
        if (note) {
            note.content = content;
        }   
    }

    createNote(content: string, owner: string) {
        const newNote = {
            id: this.vault.length + 1,
            content: content,
            owner: owner
        };
        this.vault.push(newNote);
        return newNote;
    }   
}
