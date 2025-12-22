import { Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    private readonly notesService: NotesService;

    constructor(notesService: NotesService) {
        this.notesService = notesService;
    }

    @Get('vault')
    getVault() {
        return this.notesService.getVault();
    }

    @Post('vault')
    createNote() {
        return this.notesService.createNote('New note content', 'user1');
    }

    @Post('vault/update')
    updateNote() {
        this.notesService.updateNoteById(1, 'Updated note content');
        return this.notesService.findNoteById(1);
    }

    @Post('vault/delete')
    deleteNote() {
        this.notesService.deleteNoteById(2);
        return this.notesService.getVault();
    }

    @Post('vault/find')
    findNote() {
        return this.notesService.findNoteById(1);
    }

    @Post('vault/findByOwner')
    findNotesByOwner() {
        return this.notesService.findNotesByOwner('user1');
    }

    @Post('vault/set')
    setVault() {
        const newVault = [
            { id: 1, content: 'Overwritten note 1', owner: 'admin' },
            { id: 2, content: 'Overwritten note 2', owner: 'user2' }
        ];
        this.notesService.setVault(newVault);
        return this.notesService.getVault();
    }
}
