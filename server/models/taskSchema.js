import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:String,
    details:String
})

export const Note = mongoose.model("note",noteSchema)

