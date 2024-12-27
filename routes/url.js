const express= require('express');

const{}= require("../controller/url");
const { handleGenetateNewShortURL,handleGetAnalytics } = require('../controller/url');
const router= express.Router();

router.post('/',handleGenetateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports= router;