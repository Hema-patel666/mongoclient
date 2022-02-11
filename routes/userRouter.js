const loginController=require("../controller/loginController")
const auths=require("../middleware/auth")
 const router = require("express").Router();
 const swaggerUi=require('swagger-ui-express')
 const swaggerDocument=require('../swagger/userSwagger.json')

console.log("hellow")

//router.post("/register",registerController.register)

router.post("/login",loginController.login)
router.post("/insertData",loginController.insertData)//auths.verifyToken,
router.get("/findAllUser",loginController.getAllUser)//auths.verifyToken,
router.get("/getUser/:id",loginController.getOneUser)//auths.verifyToken,
router.put("/updateUser/:id",loginController.updateUser)//auths.verifyToken,
router.delete("/deleteUser/:id",loginController.deleteUser)//auths.verifyToken,

router.use('/swaggerapi', swaggerUi.serve);
router.get('/swaggerapi', swaggerUi.setup(swaggerDocument));



module.exports=router