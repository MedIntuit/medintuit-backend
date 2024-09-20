import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    name: String,
    Description: String,
    Field1: Number,
    Field2: Number,
    Field3: Number,
    Field4: Number
});

export const channel =  mongoose.model('channel', ChannelSchema);
channel.createIndexes();