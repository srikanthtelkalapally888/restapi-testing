const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Brandname = require('./model')

app.use(express.json())

mongoose.connect('mongodb+srv://srikanthtelkalapally888:jvHXkLt7ZfBn7j0T@testingapi.gnmta8u.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log("DB connected")
    }
).catch(err => console.log(err))
app.get('/getdetails',(req,res)=>{
    res.send('<h1> Hello World </h1>');
})

app.post('/sendproducts',async(req,res)=>{
    const {brandname} = req.body;
    try{
        const newData = new Brandname({brandname})
        await newData.save()
        return res.json(await Brandname.find())
    }
    catch(err){
        console.log(err)
    }
    
})

app.get('/getallproducts', async(req,res)=>{
    try{
        const AllData = Brandname.find()
        return res.json(await AllData)
    }
    catch(err){
        console.log(err)
    }
})


app.get('/getbyid/:id', async(req, res)=>{
    try{
        const iddata = Brandname.findById(req.params.id)
        return res.json(await iddata)
    }
    catch(err){
        console.log(err)
    }
})



app.delete('/deletebyid/:id', async(req, res)=>{
    try{
        const remainingData = Brandname.findByIdAndDelete(req.params.id)
        return res.json(await remainingData)
    }
    catch(err){
        console.log(err)
    }
})

app.listen(3000,()=>{
    console.log('server is running on port number 3000')
})