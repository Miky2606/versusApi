const response = {};

response.error = (err,res)=>{
   
  return  res.json({error:err}) 
}

module.exports = response;