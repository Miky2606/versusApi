const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("./resError");
const verify = {};


verify.hash = async(password)=>{
   const newPassword =await bcrypt.hash(password,10)
    return newPassword;

}

verify.verifyPassword = async(password,encriptPassword)=>{
   

     const passwordVerify = await bcrypt.compare(password,encriptPassword);
    return passwordVerify

}


verify.jwt= async (id)=>{
 var token = await jwt.sign({
      id:id
      
  },"jonathan",{expiresIn:'1y'})

  return token;

}



verify.verifyToken = async (token,)=>{

const decode = await jwt.verify(token,"jonathan",(err,decode)=>{

    if(err){
        
       return "tokenInvalid";

    }else{
        return decode.id
    }
})

return decode;
}

module.exports = verify