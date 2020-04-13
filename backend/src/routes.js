const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes =  express.Router();

//Routes ongs
routes.get('/ongs',ongController.index);
routes.post('/ongs',ongController.create);

//Routes incident
routes.post('/incidents',incidentController.create);
routes.get('/incidents',incidentController.index);
routes.delete('/incidents/:id',incidentController.delete);

//Route profile
routes.get('/profile',profileController.index);
routes.post('/session',sessionController.create);

module.exports = routes;
