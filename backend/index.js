require('dotenv').config();
const express=require('express')
const app=express();
const cors=require('cors')

const mongoose=require('mongoose')
const URI=process.env.URI
mongoose.connect(URI)
.then((res)=>{
    console.log('Databse Successfully connected');
})
.catch((err)=>{
    console.log('Database connection error');
    
})

app.use(express.json());
app.use(cors());// Use CORS middleware to allow requests from the frontend

const userRoutes=require('./routes/UserRouter.js');
app.use('/api/auth',userRoutes)

PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log('Server running port is : ',PORT);   
})
