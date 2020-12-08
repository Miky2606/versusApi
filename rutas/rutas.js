const express =  require("express");
const rutas = express.Router();

const controller = require("./controller/controller")
const controllerVersus = require("./controller/controllerVersus")
const controllerNotifications = require("./controller/controllerNotifications")

rutas.post("/sign",controller.sign);
rutas.get("/home",controller.home);
rutas.post("/login",controller.login);
rutas.get('/versusInit',controllerVersus.versus);
rutas.get('/versusInfo/:id',controllerVersus.versusInfo);
rutas.get('/versusInfoUser/:id',controllerVersus.versusUserInfo);
rutas.get('/challengeUsers/:id',controllerVersus.challengeUsers);
rutas.post("/challenge",controllerVersus.challenge);
rutas.post("/acceptChallenge",controllerVersus.acceptChallenge);
rutas.post("/findVersusCreated",controllerVersus.findVersusCreated);
rutas.post("/failedChallenge",controllerVersus.failedChallenge);
rutas.post("/vote",controllerVersus.vote);
rutas.post("/findVote",controllerVersus.findVote);
rutas.get("/winners/:id",controllerVersus.winners);
rutas.get("/findId/:id",controllerVersus.findVersusId);

rutas.get("/findNotificationsNoView/:id",controllerNotifications.findNotificationsNoView)
rutas.get("/findNotifications/:id",controllerNotifications.findNotifications)
rutas.get("/findNotificationsInfo/:id",controllerNotifications.findNotificationsInfo)
rutas.get("/updateNotifications/:id",controllerNotifications.updateNotifications)




module.exports = rutas;