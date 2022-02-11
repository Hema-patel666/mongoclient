require("../config/db").connect()
//const Users = require("../model/userModel")
const bcrypt = require("bcryptjs");
 //const jwt = require("jsonwebtoken");
 const userService=require("../service/userService")

 module.exports.insertData=async (req, res) => {
    try {

      //        if (!(name && dob && gender && email && password && createdAt && updatedAt))
      //  {
      //  res.status(400).send("All input is required");
      //  } 
            // const oldUser = await Users.findOne({ email });
      //   if (oldUser)
      //    {
      //   return res.status(409).send("User Already Exist. Please Login");
      // }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(req.body.password, 10);
            // Create user in our database
      const vals = await userService.createUser({
        name:req.body.name,
        dob:req.body.dob,
        gender:req.body.gender,
        email:req.body.email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        createdAt:req.body.createdAt,
        updatedAt:req.body.updatedAt
      });
      console.log(vals)   // return new user
      if(vals){
        res.send({statusCode:200,msg:"insert success",data:vals})
      }
        else{
          res.send({statusCode:404,msg:"not found"})
        }
     
    } 
    catch (err) {
      console.log(err);
      res.status(500).send({msg:"internal server error",response:err.message})
    }
   }

  //find all User
    
    module.exports.getAllUser=async (req,res)=>{
      try
      {
      let fuser=await userService.findAllUser()

           res.status(200).send({ statusCode:200,data:fuser });  
      }
      catch(err)
      {
          res.status(500).send({msg:"internal server error",response:err})
          }
      }
// find one user

   module.exports.getOneUser=async (req,res)=>{
     try{
    let id=req.params.id;
    let fuser=await userService.findOneUser(id)
    if(fuser){
      res.status(200).send({ statusCode:200,data:fuser })
    }
     else{
       res.send({statusCode:404,msg:"not found"})
     }
  }
  catch(e)
  {
    console.log(e.message)
    
    res.send({sendStatus:500,msg:"internal server error",response:err})
  }
}

//update user
module.exports.updateUser=async (req,res)=>{
  try{
  let query=req.params.id
  // let ur={
  //       name:req.body.name,
  //       email:req.body.email,
  //       gender:req.body.gender
  //     }
  //let dataset={$set:ur}
 //console.log(dataset)
   let upuser=await userService.getUpdateUser(query,req.body)
if(upuser)
{
  res.send({sendStatus:200,msg:"Updated successfully",data:upuser})
}
else{
  res.send({sendStatus:404,msg:"not fount"})
}
   
  }
  catch(e)
  {
    console.log(e)
    res.send({sendStatus:500,msg:"internal server error",response:err.message})
  }
}
//Delete user
module.exports.deleteUser=async (req,res)=>{
  try{
   let id=req.params.id
   let del= await userService.deleteUsers(id)
   if(del){
    res.send({sendStatus:200,msg:"Delete Successfully",data:del})
   }
   else{
    res.send({sendStatus:404,msg:"Not Found"})
   }
       
    }
 
        catch(err)
   {
    res.send({sendStatus:500,msg:"Internal server error",response:err.message})
   }
}
//login part

module.exports.login=async (req,res,next)=>{
  try{
    let dt={
     eml:req.body.email,
      pwd:req.body.password
    }
    //console.log("dtdt..",dt)
    let val=await userService.logins(dt)
      
    if(val!=null)
    {
      res.send({statusCode:200,message:'token generated',data:val})
    }
    else{
      res.send({statusCode:404,message:'Not found'})
    }
    console.log("heelo value",val) 
    // res.status(200).json(user)

  }
  catch(err)
  {
    console.log(err)
  }
}
// exports.login=async (req, res) => {
//     try {
//       // Get user input
//       const { email, password } = req.body;

//         // Validate user input
//       if (!(email && password)) {
//         res.status(400).send("All input is required");
//       }
//       // Validate if user exist in our database
//       const user = await Users.findOne({ email });
  
//       if (user && (await bcrypt.compare(password, user.password))) {
//         // Create token
//         const token1 = jwt.sign(
//           { 
//             user_id: user._id, 
//             email 
//           },
//           process.env.TOKEN_KEY,
//           {
//             expiresIn: "2h",
//           }
//         );  
//         // save user token
//         user.token = token1;
//         await Users.updateOne( { email: email },{$set:{"token":token1}})
//         // user
//         res.status(200).json(user);
//       }
//       res.status(400).send("Invalid Credentials");
//     }
//      catch (err) {
//       console.log(err);
//     }
//   }