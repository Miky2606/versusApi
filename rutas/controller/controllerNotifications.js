const pool = require("../../db/conexion");
const controller = require("./controller");

controllerNotifications ={};

controllerNotifications.findNotificationsNoView = (req,res)=>{
    pool.query("Select * From notifications where idUser = ? and visto = ?",[req.params.id,1],(err,success)=>{
        if(err){
console.log(err)
        }else{
            res.json({notifications:success})
        }
    })
}


controllerNotifications.findNotifications = (req,res)=>{
    pool.query("Select * From notifications where idUser = ? order By fecha Asc",req.params.id,(err,success)=>{
        if(err){
console.log(err)
        }else{
            res.json({notifications:success})
        }
    })
}

controllerNotifications.findNotificationsInfo = (req,res)=>{
     pool.query("Select * From Users where id = ?",req.params.id,(err,success2)=>{
                    if(err){
            console.log(err)
                    }else{
                      
                        res.json({notifications:success2})
                    }
               });
 
        
}

controllerNotifications.updateNotifications = (req,res)=>{
    pool.query("Update  notifications set visto = ? where idUser = ? and visto = ?",[0,req.params.id,1],(err,success2)=>{
        if (err) {
            console.log(err)
            
        }else{
           res.json({update:"update"})
        }
    })
}

module.exports = controllerNotifications;