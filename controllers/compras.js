const mongoose = require('mongoose');
const assert= require('assert');
const dbName ='compras';
const url= 'mongodb://Sofia:sofia97@192.168.1.42:27017/'+dbName;
var Schema = mongoose.Schema;

// Create compra Schema
var compraSchema = new Schema ({
    nroCompra : Number,
    productos : [{codigo: Number, monto: Number}],
    montoTotal : Number,
    formaDePago : String,
    nroTarjeta : Number

});


// Add compra Schema some functions
compraSchema.statics.findByFormaDePago = function (fdp, cb) {
    return this.find({ formaDePago: new RegExp(fdp,'i')  }, cb);
}

compraSchema.statics.findByNroCompra = function (nroCompra, cb) {
    return this.find({ nroCompra: 2  }, cb);
}

compraSchema.methods.findSameCardNumber= function(cb){
    return this.model('Compra').find({nroTarjeta: this.nroTarjeta},cb);
}

// Create compra Model
var Compra = mongoose.model('Compra', compraSchema);

// Connect to Mongo
mongoose.connect(url, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
})

// Create function to get one compra by nroCompra
module.exports.comprasReadOne = function(req,res){
    if(req.params && req.params.nroCompra){
        Compra.findByNroCompra(req.params.nroCompra).exec(function(err,compra){
            if(!compra){
                sendJsonResponse(res,404,{
                    "message" : "nroCompra not found"
                });
                return;
            } else if(err){
                sendJsonResponse(res,404,err);
                return;
            }
            sendJsonResponse(res,202,compra);
            return;
        })
    } else{
        sendJsonResponse(res,404, {
            "message" : "Not nroCompra in request"
        });
    }
};

module.exports.comprasCreate = function(req,res){
  Compra.create({
    nroCompra : req.body.nroCompra,
    montoTotal: req.body.montoTotal,
    formaDePagap: req.body.formaDePago,
    nroTarjeta: req.body.nroTarjeta,
    productos : [{
        codigo: req.body.codigo,
        monto: req.body.monto
    }],
  }, function (err, compra){
      if (err) {
          sendJsonResponse(res, 400, err);
      } else {
          sendJsonResponse(res, 201, compra)
      }
  });
};

module.exports.comprasDeleteOne = function(req,res){
    var nroCompra = req.params.nroCompra;
    if(nroCompra){
        Compra.findByNroCompra(nroCompra).exec(function(err,compra){
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
               sendJsonResponse(res, 204, null);
        });
    } else{
        sendJsonResponse(res, 404, {
            "message" : "Not nroCompra in request"
        });
    }
};

module.exports.comprasListByFormaDePago = function (req,res){

}

module.exports.comprasUpdateOne = function(req,res){

}
