const mysql = require("mysql");
const db = require("./db");

const util= require("util");
const { connect } = require("tls");

const pool = mysql.createPool(db);

pool.getConnection((err,connection)=>{
    if(err){
        console.log(err)
    }else{
        connection.release()
        console.log("conected")
    }
});

pool.query = util.promisify(pool.query);

module.exports = pool;