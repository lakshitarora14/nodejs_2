const express = require('express')
const User = require('../src/models/user')
const router = new express.Router()

router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(error){
        res.status(400).send(error.message)
    }

})

router.get('/users',async (req,res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(error){
        res.status(500).send()
    }
})

router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user =  await User.findById(_id)
        if(!user)
        {
            res.status(400).semd()
        }
        res.send(user)
    }
    catch(e)
    {   
        res.status(500).send()
    }
})

router.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['age','name','email','password']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({'error':'invlid field cannot update'})
    }
    try{
        const user = await  User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValdiators:true })
        if(!user)
        {
            return res.status(400).send()
        }
        res.send(user)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.send({'errro':'This id does not exist in users'})
        }
        res.send(user)
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})

module.exports = router