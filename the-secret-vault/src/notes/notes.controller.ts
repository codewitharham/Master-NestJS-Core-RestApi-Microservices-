import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, Request } from '@nestjs/common';
import { NotesService } from './notes.service'; //
import { RoleGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/custom-decorators/auth/roles.decorator';

@Controller('notes')
export class NotesController {
    // 1. Cleaner Dependency Injection using 'private readonly' in constructor
    constructor(private readonly notesService: NotesService) {} 

    @Get('vault')
    getVault() {
        return this.notesService.getVault();
    }

    @Post('vault')
    // 2. Use @Body to get content and @Request to get the owner from the authenticated user
    createNote(@Body('content') content: string, @Request() req) {
        // In a real app, the Guard attaches the user to the request
        const owner = req.user?.username || 'guest'; 
        return this.notesService.createNote(content, owner);
    }

    @Put('vault/:id') // 3. Use standard HTTP PUT and URL parameters for updates
    @UseGuards(RoleGuard)
    @Roles('admin')
    updateNote(@Param('id') id: string, @Body('content') content: string) {
        this.notesService.updateNoteById(+id, content);
        return this.notesService.findNoteById(+id);
    }

    @Delete('vault/:id') // 4. Use standard HTTP DELETE for removals
    @UseGuards(RoleGuard)
    @Roles('admin')
    deleteNote(@Param('id') id: string) {
        this.notesService.deleteNoteById(+id);
        return { message: `Note ${id} deleted`, vault: this.notesService.getVault() };
    }

    @Get('vault/:id')
    findNote(@Param('id') id: string) {
        return this.notesService.findNoteById(+id);
    }

    @Get('vault/owner/:owner')
    findNotesByOwner(@Param('owner') owner: string) {
        return this.notesService.findNotesByOwner(owner);
    }

    @Post('vault/set')
    @UseGuards(RoleGuard)
    @Roles('admin')
    setVault(@Body() newVault: any[]) {
        // Allow admins to pass the new vault structure via the request body
        this.notesService.setVault(newVault);
        return this.notesService.getVault();
    }
}