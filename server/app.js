const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');

config({path:'./config/config.env'});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PaymentController = require('./controllers/paymentController.js')
app.use('/payment', PaymentController); 

module.exports = {app}; 