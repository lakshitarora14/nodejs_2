const express = require('express')
const Task = require('../src/models/task')
const router = new express.Router()

router.get('/tasks', async (req,res)=>{

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }
    catch(error){
        res.status(500).send()
    }

})

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById({_id})
        if(!_id){
            return res.status(400).send()
        }
        res.send(task)
    }
    catch(error)
    {
        res.status(500).send()
    }

})

router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.patch('/tasks/:id', async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation= updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation)
    {
        return res.status(400).send({'error':'invalid update'})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        if(!task)
        {
            return res.status(400).send()
        }
        res.send(task)
    }   
    catch(error)
    {
        res.status(400).send(error)
    }
} )

router.delete('/tasks/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task)
        {
            return res.status(400).send({'error':'Id not present'})
        }
        res.send(task)
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})

module.exports = router