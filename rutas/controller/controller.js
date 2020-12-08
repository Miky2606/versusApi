const controller = {};
const jwt = require("jsonwebtoken");
const pool = require("../../db/conexion.js");
const string = require("sqlstring");
const verify = require("./password");
const responses = require("./resError")
const { password } = require("../../db/db.js");
const rutas = require("../rutas.js");
const response = require("./resError");

controller.sign = async (req,res)=>{
    const verifyString = /[<>!@#$%^&* ]/;

  let datos = {
      "username":req.body.username,
      "password":req.body.password,
      "email":req.body.email,
      "token":req.body.token,
      "os":req.body.os
  };
  
    try {
       
      var ver=  verifyString.test(datos.username);
     
       if(ver == false){
          
        var response = await pool.query("Select * From Users where email = ?", datos.email);
        
        if(response.length == 0){
            datos.password = await verify.hash(datos.password);

            pool.query("Insert Into Users set ?",datos,async (err,success)=>{
                if(!err){
                    
                    var token =  await verify.jwt(success.insertId); 
                    res.json({
                        res:"Created",
                        token:token
                    })   
                    
                }else{
                    responses.error(err,res);
                }
            })
        }else{
            responses.error("email ya existe",res)
        }
         
      }else{
        responses.error("Characteres",res)
      }
 
      
        
    } catch (error) {
        console.log(error)
        
    }
}


//Verify User

controller.home = async(req,res)=>{
    const token = req.headers.token;
  const idUser = await verify.verifyToken(token);
  
if(idUser == "tokenInvalid"){
    response.error(idUser,res);
}else{
  
  pool.query("Select * From Users where id = ?", idUser,(err,success)=>{
      if(err){
          response.error(err,res);
      }else{
          res.json({user:success})
      }
  })
}
}


//login User
controller.login = async (req,res)=>{
   

  let datos = {
      
      "password":req.body.password,
      "email":req.body.email,
      
  };
  
    try {
      
        pool.query("Select * From Users where email = ? ", datos.email,async (err,success)=>{
            if(err){
                response.error(err,res)
             
            }else{
                if(success.length > 0){
            
             const password = await verify.verifyPassword(datos.password,success[0].password);
             
            if(password == true){
            const token = await verify.jwt(success[0].id);

            res.json({res:"logged",
        token:token})

            }else{
            
                response.error("passwordIncorrect", res)

            }  
        
        }else{
            response.error("UserIncorrect",res)


            }
     

        }


        })

      
        
    } catch (error) {
        
        response.error(error,res)
        
    }
}



module.exports= controller;