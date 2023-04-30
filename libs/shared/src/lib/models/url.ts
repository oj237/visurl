import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
    hash: {
        type: String,
        require: true
    },

    url: {
        type: String,
        required: true
    },

    visits: {
        type: Number,
        default: 0
    },

    inits: {
        type: Number,
        default: 0
    }
});

export interface Url extends mongoose.Document {
    id: string,
    hash: string,
    url: string,
    inits: number,
    visits: number
}