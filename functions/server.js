const serverless = require('serverless-http');
const express = require('express');
const yourApp = require('../index'); // Remplacez par le nom de votre fichier d'application

const app = express();
app.use('/.netlify/functions/server', yourApp);

module.exports = app;
module.exports.handler = serverless(app);
