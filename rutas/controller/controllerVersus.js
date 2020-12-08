const controllerVersus = {};
const pool = require("../../db/conexion.js");
const response = require("./resError");
const request = require("request");
const { post } = require("../rutas.js");
const uuid = require("uuid");
const controller = require("./controller.js");


controllerVersus.versus = (req,res)=>{
    
   pool.query("SELECT  *  From versus  ",(err,success)=>{
       if(err){
           response.error(err,res)
       }else{

        if(success.length == 0){
           response.error("empty",res)
        }else{
          res.json({versus:success})
        }
       }
   })

}


controllerVersus.versusInfo = (req,res)=>{
    const idVersus = req.params.id;
  
        pool.query("Select * From VersusInfo where idVersus =  ?",idVersus,(err,success)=>{
            if(err){
                response.error(err,res);
            }else{
                res.json({
                    user:success
                })
            }
     

        })
 
        
    
}

controllerVersus.versusUserInfo = (req,res)=>{
    const id = req.params.id;
    pool.query("Select * From Users where id =  ?",id,(err,success)=>{
        if(err){
            response.error(err,res);
        }else{
            res.json({
                user:success
            })
        }
 

    })



}


controllerVersus.challengeUsers = (req,res)=>{
    const id=  req.params.id;
      pool.query("Select * From Users where id != ?",id,(err,success)=>{
          if(err){
              response.error(err,res);
          }else{
              res.json({
                  user:success
              })
          }
   
  
      })
  }


  controllerVersus.challenge = (req,res)=>{
    var datos={
        "idUser":req.body.id,
        "idUserVs":req.body.idUser,
        "visto":"1",
        "type":"vs"
    }
    pool.query("Insert Into notifications  Set ?",datos,(err,success)=>{
        if(err){
            console.log(err)
        }else{
   
     request({url:"https://fcm.googleapis.com/fcm/send",
     method:"Post",
     json:true,
     body:{
        
         
        "to":req.body.token,
        "notification":{
            "body":`${req.body.username} challenge you.`,
            "title":'Challenge you',
            "sound":"default"
        },
        "data":{
            "nameVersus":req.body.username,
            'image':req.body.image,
            "idUserVs":req.body.id,
            "idUser":req.body.idUser,
            "tokenUser":req.body.tokenUser,
            "imageVs":req.body.imageVs,
            "usernameVs":req.body.usernameVs,
            "idNotifications":success.insertId,
            "type":"reto",
            "click_action": "FLUTTER_NOTIFICATION_CLICK"
    
        }},
    
    headers:{
        "Authorization": "key=AAAAW0AddFs:APA91bG5Fu5cK2VwGBzVMhOLPobOJ0Tgv7sgk6WzRBNSJI19WRbEY21RockvYTKd36aohqkEJ6H1o5xg8NlbIWs-IZSK3JMDr5PMXF0PoCpzOqzumlFHGXkJveiTqSWFVvSx7uJJnX2A"
       
    }
     },(err,success)=>{
         if(err){
             console.log(err)
         }else{
          

           
                    res.json({versus:"send"})

                
           
            
             
         }
     })
    }
})
  }

  controllerVersus.acceptChallenge = (req,res)=>{
      var randomId = Math.random().toString(8).slice(-8);
      var date = new Date();
      var time = date.getFullYear() +"-"+ (date.getMonth()+1)+ "-" + (date.getDate() +1)
      
      console.log(time);
      var datos ={
          "idUser":req.body.idUser,
          "idUserVersus":req.body.idCont,
          "idEncriptVersus":randomId,
          "timeFinish":time
      };
     pool.query("Insert into versus set ?",datos,(err,success)=>{
         
         if(err){
             console.log(err)
         }else{
            
             var datosA = {
                 "idVersus":success.insertId,
                 "idUser": datos.idUser,
                 "votos": 0
             };
             pool.query("Insert into VersusInfo set ?",datosA,(err,check)=>{
                 
                 if(err){
                     console.log(err)
                 }else{
                var datosB = {
                    "idVersus":success.insertId,
                    "idUser": datos.idUserVersus,
                    "votos": 0
                };
           
                pool.query("Insert into VersusInfo set ?",datosB,(err,check)=>{
                    if(err){
                        console.log(err)
                    }else{
                        pool.query("Delete from notifications where id = ?",req.body.idNotifications,(err,success)=>{
                            if(err){
                                response.error(err,req)
                            }else{
                                res.json({message:"Creado"})
                            }
                        })
                    
                    }
                
                })
            }
             })

            
         }
     })
  }

  controllerVersus.findVersusCreated = (req,res)=>{
      var datos = {
          "idUser":req.body.idUser,
          "idUserVersus":req.body.idUserVersus
      }
      pool.query("Select * From versus where idUser = ? and idUserVersus =?",[datos.idUser,datos.idUserVersus],(err,success)=>{
          if(err){
              response.error(err,req)
          }else{
              if(success.length > 0){
                  res.json({message:success})
              }else{
                  res.json({message:"empty"})
              }
          }
      })
  }



  controllerVersus.failedChallenge=(req,res)=>{
     
      
    request({url:"https://fcm.googleapis.com/fcm/send",
    method:"Post",
    json:true,
    body:{
  
       "to":req.body.token,
       "notification":{
           "body":`Challenge denied.`
       },
       "data":{
           "image":req.body.image,
           "usernameVs":req.body.username,
         
           "type":"denied",
           "click_action": "FLUTTER_NOTIFICATION_CLICK"
   
       }},
   
   headers:{
       "Authorization": "key=AAAAW0AddFs:APA91bG5Fu5cK2VwGBzVMhOLPobOJ0Tgv7sgk6WzRBNSJI19WRbEY21RockvYTKd36aohqkEJ6H1o5xg8NlbIWs-IZSK3JMDr5PMXF0PoCpzOqzumlFHGXkJveiTqSWFVvSx7uJJnX2A"
      
   }
    },(err,success)=>{
        if(err){
            console.log(err)
        }else{
           
            res.json({message:"enviado"})
        }
    })

  }


  controllerVersus.vote = (req,res)=>{
    
     
      pool.query("Update VersusInfo Set votos = votos+1 Where idUser = ? and idVersus = ?",[req.body.idUserVote,req.body.id],(err,success)=>{
          if(err){
              console.log(err)
          }else{
              var datos={
                  idUser:req.body.idUser,
                  idVersus:req.body.id,
                  idVote:req.body.idUserVote
              }
             pool.query("Insert Into VersusVote Set ?",datos,(err,success)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json({message:"vote"})
                }
             })
          }
      })
  }

 controllerVersus.findVote=(req,res)=>{
    
    pool.query("Select * From VersusVote where idUser = ? and idVersus =?",[req.body.idUser,req.body.id],(err,success)=>{
        if(err){
            response.error(err,req)
        }else{
            if(success.length>0){
           res.json({message:true})
            }else{
                res.json({message:false})
            }
        }
    })
 }


 controllerVersus.winners = (req,res)=>{
    
     pool.query("Select * from VersusInfo where idVersus = ?",req.params.id,(err,success)=>{
         var votos;
       
            if(success[0].votos> success[1].votos){
                votos = success[0].idUser
            }else{
               votos = success[1].idUser
            }
          
            
     res.json({winners:votos})

        

      
            
        });
       
       
    
   
 }


 controllerVersus.findVersusId = (req,res)=>{

    pool.query("Select * From versus where idEncriptVersus like ?",['%'+req.params.id+'%'],(err,success)=>{
        if(err){
    response.error(err,res)
        }else{
            if(success.length >0){
            res.json({find:success})
            }else{
                res.json({find:"empty"})
            }
        }
    })
    
 }


module.exports = controllerVersus;