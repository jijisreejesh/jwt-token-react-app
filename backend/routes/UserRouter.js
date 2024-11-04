const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userModel = require("../models/userSchema");
// const e = require("express");
router.post("/", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist)
      return res.send("User already exists");
    const hashedPAssword=await bycrypt.hash(password,10);
    const details1 = await userModel.create({ name, email, password:hashedPAssword, age });
    res.status(200).json({ Message: `Inserted Successfully : ${details1}` });
  } catch (err) {
    res.status(400).json({ Message: `Error : ${err}` });
  }
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email})
        if(!user)
            return res.send('mismatch');
        const isMatch = await bycrypt.compare(password,user.password)
        if(!isMatch) 
            return res.send("password mismatch")
     
     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h'});
     res.json({ token });
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
})

router.get("/home",(req,res)=>{
  const token=req.headers["authorization"];
  if(!token) return res.status(403).json({message : "Token required"})
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
  if(err) return res.status(403).json({message : "Invalid token"})
    //proceed if token is valid
  let name=decoded.email.split('@')[0]
  res.status(200).json({message:`Welcome to the dashboard , ${name}`})
  })

})

module.exports = router;
