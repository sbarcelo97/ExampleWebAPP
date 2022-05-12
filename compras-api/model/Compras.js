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
    return this.find({ nroCompra: nroCompra  }, cb);
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
                res.status(404).send("No hay nroCompra en el request")
            } else if(err){
                res.status(404).send(err)
                return;
            }
            res.json(compra)
            return;
        })
    } else{
        res.status(404).send("ocurrio un error")
    }
};

module.exports.comprasReadAll = function(req,res,next){
    console.log("read all");
    Compra.find(function(err,compra){
        if(err){
            res.status(404).send("Ocurrio un error")
        }
        res.json(compra)
    });
}

module.exports.comprasCreate = function(req,res){
    console.log("Creando compra");  
    console.log(req.body);
    Compra.create(req.body, function (err, compra){
      if (err) {
        res.status(404).send("Ocurrio un error")
      } else {
          res.json(compra)
      }
  });
};

module.exports.comprasDeleteOne = function(req,res){
    var nroCompra = req.params.nroCompra;
    if(nroCompra){
        Compra.findOneAndDelete({"nroCompra": nroCompra}, function (err, compra){
            if(err){
                res.status(404).send("Ocurrio un error")
            }
            res.json(compra)
        
        });
    } else{
        res.status(404).send("No hay nroCompra en el request")
    }
};

module.exports.comprasListByFormaDePago = function (req,res){
    var formaDePago= req.params.formaDePago;
    if(formaDePago){
        Compra.findByFormaDePago( formaDePago, function (err, compras) {
            if(err){
                res.status(404).send("Ocurrio un error")
                return;
            }
                res.json(compras)
        });
    } else{
        res.status(404).send("No hay formaDePago en el request")
    }
}

module.exports.comprasUpdateOne = function(req,res){
    var nroCompra = req.params.nroCompra;
    console.log("Va a updatear")
    if(nroCompra){
        Compra.findOneAndUpdate({"nroCompra": nroCompra}, req.body, function (err, compra){
            if(err){
                res.status(404).send("Ocurrio un error")
            }
           
            console.log("Update the document with id: "+ compra._id);
            res.json(compra)
            
        });
            
    } else{
        res.status(404).send("No hay nroCompra en el request")
    }

}