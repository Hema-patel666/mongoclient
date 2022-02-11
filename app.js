require("dotenv").config();
const express = require("express");
const ports = process.env.PORT|| port
const userRouter=require("./routes/userRouter")
const auth=require("./middleware/auth")
const app = express();
// server listening


app.use(express.json());

app.use("/api/v1/user",userRouter)

app.get("/",(req,res)=>{
    res.send("hello mongooes..  server")
}) 

app.listen(ports, () => {
  console.log(`Server running on port ${ports}`);
});

// app.get("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });
module.exports = app;