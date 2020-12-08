const express = require("express");
const app = express();
const path = require("path");
const rutas = require("./rutas/rutas")
const conexion = require("./db/conexion")

const port  =  process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(rutas);

app.listen(port, (req,res)=>{
    console.log(`Conected ${port}`)
})
