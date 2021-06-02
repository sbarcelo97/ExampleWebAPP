const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const assert= require('assert');
const dbName ='compras';
const url= 'mongodb://Sofia:sofia97@192.168.1.41:27017/'+dbName;

var Schema = mongoose.Schema;


var compraSchema = new Schema ({
    nroCompra : Number,
    productos : [{codigo: Number, monto: Number}],
    montoTotal : Number,
    formaDePago : String,
    nroTarjeta : Number

});

