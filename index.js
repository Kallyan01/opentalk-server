const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose")
const db = require("./database/db")
const User = require("./database/schema/user")

let users = [];

app.get("/", (req, resp) => {
  resp.send("Welcome To Home");
});
app.get("/user/:id", (req, resp) => {
  users.map((user) => {
    if (user.id === req.params.id) resp.send(user);
  });

  resp.send("Not Found");
});
app.post("/user/create", async(req, resp) => {
  // let user = {
  //   id: "30ed4H342",
  //   name: "",
  //   dept: "",
  //   msgs: [],
  // };
  let data = new User(req.body);
  let result = await data.save();
  resp.send(result);
  
  // user.name = req.body.name;
  // user.dept = req.body.dept;
  // users.push(user);
  // users.map((e) => console.log(e));
  // resp.send(user);
});
app.post("/user/:id/sentmsg", (req, resp) => {
  users.map((user) => {
    if (user.id === req.params.id) {
      user.msgs.push(req.body.msg);
      resp.send(user)
    }
    resp.status(200)
  });

 
});

app.listen(5000, () => {
  console.log("Live on PORT 5000");
});
