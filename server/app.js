import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Note } from './models/taskSchema.js'

const app = express()
const port = 5002

app.use(express.json());
app.use(cors())

try{
    await mongoose.connect("mongodb://localhost:27017/notes")
    console.log('mongoDB connected successfully');
    
}catch(err){
    console.log("mongoDB connection failed");

}
app
    .get('/', (req, res) => {
        res.send('Hello World!')
    })
    .get('/api/display', async(req, res) => {
        const data = await Note.find({})
        res.json(data)
    })
    .get('/api/individual/:id', async(req, res) => {
        const id = req.params.id;
        const note = await Note.findOne({_id:id})
        res.json([note])
    })
    .post('/api/create', async(req, res) => {
        const { title,details } = req.body;
        if(!title.trim() || !details.trim()) return
        else{
            await Note.create({title,details})
        }
        res.json("created")
    })
    .post('/api/edit', async(req, res) => {
        const { id,title,details } = req.body;
        await Note.updateOne({_id:id},{title,details})
        res.json("edited")
    })
    .post('/api/delete', async(req, res) => {
        const { id } = req.body;
        await Note.deleteOne({_id:id})
        res.json("deleted")
    })

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
