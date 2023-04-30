import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    admin: {
        type: Boolean,
        default: false
    }
});

export interface User extends mongoose.Document {
    id: string,
    name: string,
    email: string,
    password: string,
    admin: boolean
}