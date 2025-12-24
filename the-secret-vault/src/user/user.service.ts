import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {

    private users: User[] = [
        {
            id: 1,
            username: 'arham',
            email: 'codewitharham@gmail.com',
            password: 'admin123',
            role: 'admin'
        },
        {
            id: 2,
            username: 'user1',
            email: 'abcd@gmail.com',
            password: 'user123',
            role: 'user'
        },
        {
            id: 3,
            username: 'user2',
            email: 'efgh@gmail.com',
            password: 'user234',
            role: 'user'
        },
        {
            id: 4,
            username: 'user3',
            email: 'ijkl@gmail.com',
            password: 'user345',
            role: 'user'
        }

    ];

    findUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    findUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    findUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    getAllUsers(): User[] {
        return this.users;
    }

    createUser(userData: Omit<User, 'id'>): User {
        const newUser: User = {
            id: this.users.length + 1,
            ...userData
        };
        this.users.push(newUser);
        return newUser;
    }

    deleteUserById(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }

    updateUserById(id: number, updateData: Partial<Omit<User, 'id'>>): User | undefined {
        const user = this.findUserById(id);
        if (user) {
            Object.assign(user, updateData);
            return user;
        }
        return undefined;
    }

    updateUserPassword(id: number, newPassword: string): User | undefined {
        const user = this.findUserById(id);
        if (user) {
            user.password = newPassword;
            return user;
        }
        return undefined;
    }

    updateUserRole(id: number, newRole: string): User | undefined {
        const user = this.findUserById(id);
        if (user) {
            user.role = newRole;
            return user;
        }
        return undefined;
    }

    updateUserEmail(id: number, newEmail: string): User | undefined {
        const user = this.findUserById(id);
        if (user) {
            user.email = newEmail;
            return user;
        }   
        return undefined;
    }

    updateUsername(id: number, newUsername: string): User | undefined {
        const user = this.findUserById(id);
        if (user) {
            user.username = newUsername;
            return user;
        }
        return undefined;
    }
    
    
    

}
