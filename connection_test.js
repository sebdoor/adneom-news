var express = require('express');
var app = express();

var mongoose = require('mongoose');

// Connexion avec mongoose via mongolab
mongoose.connect('mongodb://seb:seb@ds013290.mlab.com:13290/adneom');

var db = mongoose.connection;

db.on('error', function() {
   console.log('*****CONNECTION ERROR*****'); 
});

db.on('open', function() {
   console.log('**** CONNECTION SUCCEED ****'); 
});


