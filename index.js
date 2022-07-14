const { response } = require("express");
const express = require("express");
const validUser = require("./middlewares/validUser")
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const db = require("./database/db");
const User = require("./database/schema/user");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
app.use(cors());
app.get("/hello", async (req, resp) => {
  resp.status(200).send("Hi from server");
});

app.get("/getuser/:_id", async (req, resp) => {
  let data = await User.findOne(req.params);
  if(data)
  {
    resp.send({
      status: true,
      username: data.name
    });
  }
  else
  resp.send({
    status: false,
    err: "No user found"
  })
});
app.get("/user/:_id/:authcode",validUser, async (req, resp) => {
  try{
    let data = await User.findOne(req.params);
    resp.send({
      auth:true,
      name: data.name,
      activedate: data.activedate,
      msgs: data.msgs,
      _id: data._id,
      linkvisits: data.linkvisits,
      password: data.password
    });
  }
  catch(err){
    resp.status(500).send({status:500,msg: "Server Error "})
  }
});

app.post("/user/create", async (req, resp) => {
  let data = new User(req.body);
  data.authcode = uuidv4();
  data.password = Math.floor(Math.random() * 1000000) + 107;
  try {
    let result = await data.save();
    resp.status(201).send({
      message: "User Successfully Created",
      _id: result._id,
      authcode: result.authcode,
    });
  } catch (err) {
    resp.status(500).send({msg: "something wrong" });
  }
});

app.get("/linkview/inc/:_id",async(req,resp)=>{
  try{
    let data = await User.updateOne(req.params, { $inc: { linkvisits : 1} });
      resp.status(200).send(data);
  }
  catch(err)
  {
    resp.status(500).send(err)
  }
})

app.post("/user/:_id/sentmsg", async (req, resp) => {
  try{
    if(req.body.msgs.text.length>1)
    {
      let data = await User.updateOne(req.params, { $push: req.body });
      resp.send(data);
    }
    else
    {
      resp.status(400).send({msg:"The Message text is too short Min 2 char length is allowed"})
    }
  }
  catch(err)
  {
    resp.status(500).send({msg: "Try Again ! something wrong in server side" });
  }
});

app.listen(5000, () => {
  console.log("Live on PORT 5000");
});
