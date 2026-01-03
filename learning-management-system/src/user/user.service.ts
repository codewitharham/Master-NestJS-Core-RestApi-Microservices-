import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    // User service methods will go here
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
        // Injecting the User model
        // to interact with the users collection in MongoDB
    ) {}

    async createUser(name: string, email: string, password: string, role: string): Promise<User> {
        const newUser = new this.userModel({ name, email, password, role });
        return newUser.save();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        
        const user = await this.userModel.findOne({ email }).exec();

        if (!user) {
            return null;
        }
        return user;
    
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            return null;
        }
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async deleteUser(id: string): Promise<User | null> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }

    async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return updatedUser;
    }

    async getUsersByRole(role: string): Promise<User[]> {
        return this.userModel.find({ role }).exec();
    }

    async countUsers(): Promise<number> {
        return this.userModel.countDocuments().exec();
    }

    async countUsersByRole(role: string): Promise<number> {
        return this.userModel.countDocuments({ role }).exec();
    }

    async searchUsersByName(name: string): Promise<User[]> {
        return this.userModel.find({ name: { $regex: name, $options: 'i' } }).exec();
    }

    async changeUserPassword(id: string, newPassword: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            return null;
        }
        user.password = newPassword;
        return user.save();
    }

    async getRecentUsers(limit: number): Promise<User[]> {
        return this.userModel.find().sort({ createdAt: -1 }).limit(limit).exec();
    }

    async getUsersCreatedAfter(date: Date): Promise<User[]> {
        return this.userModel.find({ createdAt: { $gt: date } }).exec();
    }

    async getUsersCreatedBefore(date: Date): Promise<User[]> {
        return this.userModel.find({ createdAt: { $lt: date } }).exec();
    }

    async getUsersCreatedBetween(startDate: Date, endDate: Date): Promise<User[]> {
        return this.userModel.find({ createdAt: { $gte: startDate, $lte: endDate } }).exec();
    }
}
