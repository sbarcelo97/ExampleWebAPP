const mongoose = require('mongoose');
const assert= require('assert');
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

module.exports.comprasReadAll = function(req,res,next){
    console.log("read all");
    Compra.find(function(err,compra){
        if(err){
            return next(err)
        }
        res.json(compra)
    });
}

module.exports.comprasCreate = function(req,res){
    console.log("Creando compra");  
    Compra.create({
    nroCompra : req.body.nroCompra,
    montoTotal: req.body.montoTotal,
    formaDePago: req.body.formaDePago,
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
               console.log(compra)
               sendJsonResponse(res, 204, null);
        });
    } else{
        sendJsonResponse(res, 404, {
            "message" : "Not nroCompra in request"
        });
    }
};

module.exports.comprasListByFormaDePago = function (req,res){
    var formaDePago= req.params.formaDePago;
    if(formaDePago){
        Compra.findByFormaDePago( formaDePago, function (err, compras) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
                console.log("Buscando por forma de pago = "+formaDePago+" encontramos : ")
                console.log(compras);
               sendJsonResponse(res, 204, null);
        });
    } else{
        sendJsonResponse(res, 404, {
            "message" : "Not forma de pago in request"
        });
    }
}

module.exports.comprasUpdateOne = function(req,res){
    var nroCompra = req.params.nroCompra;
    if(nroCompra){
        Compra.findByIdAndUpdate(req.params.nroCompra, req.body, function (err, compra){
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
           
            console.log("Update the document with id: "+ compra);
            cb(result);
               sendJsonResponse(res, 204, null);
            
        });
            
    } else{
        sendJsonResponse(res, 404, {
            "message" : "Not nroCompra in request"
        });
    }

}