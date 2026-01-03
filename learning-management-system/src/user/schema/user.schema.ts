import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "../enum/user.enum";

@Schema({
    timestamps: true,

})

export class User {
    @Prop({ required: true, minLength: 3 })
    name: string;
    
    @Prop({ required: true, unique: true })
    email: string;
    
    @Prop({ required: true, minLength: 6 })
    password: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.STUDENT })
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);