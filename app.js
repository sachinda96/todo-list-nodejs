import express, {response} from 'express'

import {getPendingTask, saveTask,updateAsDone,removeItem} from './database.js'


const app = express()
app.use(express.json())

app.listen('8080', ()=>{
    console.log("App is starting with port 8080")
})

app.get('/pendingitems/:status', async (req,res) =>{
    const status = req.params.status
    const rows = await getPendingTask(status)
    res.send(rows)
})


app.post('/savedata', async (req, res) =>{
    const {item, seq} = req.body;
    await saveTask(item,seq);
    res.status(201).send({"status":"created"})
})

app.delete('/delete/:id', async (req,res) =>{
    const id = req.params.id
    await removeItem(id);
    res.status("201").send("deleted")
})


// app.use((err,req, res, next) => {
//     console.error(err)
//     res.st
// })
