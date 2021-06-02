const mongoose = require('mongoose');
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

compraSchema.statics.findByFormaDePago = function (fdp, cb) {
    return this.find({ formaDePago: new RegExp(fdp,'i')  }, cb);
}

compraSchema.statics.findByNroCompra = function (nroCompra, cb) {
    return this.find({ nroCompra: 2  }, cb);
}

compraSchema.methods.findSameCardNumber= function(cb){
    return this.model('Compra').find({nroTarjeta: this.nroTarjeta},cb);
}

var Compra = mongoose.model('Compra', compraSchema);
var compra1 = new Compra({nroCompra:1, productos:[{codigo:0, monto:50.00}, {codigo:123, monto:200.00},
    {codigo:222, monto:150.00}], montoTotal:400.00, formaDePago:"ef"});
var compra2 = new Compra({nroCompra:2, productos:[{codigo:22, monto:1000.00}], montoTotal: 1000.00, formaDePago: "debito",
nroTarjeta:"4893234956002345"});
var compra3 = new Compra({nroCompra:3, productos:[{codigo:10, monto:530.00}, {codigo:123, monto:200.00},
    {codigo:225, monto:120.00}], montoTotal:850.00, formaDePago:"ef"});
var compra4 = new Compra({nroCompra:4, productos:[{codigo:232, monto:1500.00},{codigo:12, monto:450.00}], montoTotal: 1950.00, 
    formaDePago: "credito", nroTarjeta:"4893234956002345"});
var compra5 = new Compra({nroCompra:5, productos:[{codigo:14, monto:350.00},{codigo:13, monto:230.00},
    {codigo:95, monto:120.00}], montoTotal:700.00, formaDePago:"ef"});
var compra6 = new Compra ({nroCompra:6, productos:[{codigo:232, monto:1500.00},{codigo:54, monto:2350.00}], montoTotal: 3850.00,formaDePago: "ef"});



mongoose.connect(url, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
    insertCompras(function(){
        console.log("inserts cumplidos");
        Compra.findByFormaDePago( 'ef', function (err, compras) {
            console.log("Buscando por forma de pago = ef encontramos : ")
            console.log(compras);
            Compra.findByNroCompra( 2, function (err, compras) {
                console.log("Buscando por nro compra = 2 encontramos : ")
                console.log(compras);
                compra2.findSameCardNumber(function (err,compras){
                    console.log("Buscando compras con el mismo nro de tarjeta que la compra 2 obtuvimos: ")
                    console.log(compras)
                    updateCompra(function(result){
                        removeCompra(6,function(result){
                            removeAllCompras(function(result){
                                mongoose.connection.close();
                            })
                        })
                       
                    })
                   
                });
                });
            });
            
        }
        )
       
});
    


const insertCompras = function(callback){
    compra1.save(function (err) {
        if (err) { console.log(err); } else {
        console.log('compra1 guardada');
        compra2.save(function (err) {
            if (err) { console.log(err); } else {
                console.log('compra2 guardada');
                compra3.save(function (err) {
                    if (err) { console.log(err); } else {
                        console.log('compra3 guardada');
                        compra4.save(function (err) {
                            if (err) { console.log(err); } else {
                                console.log('compra4 guardada');
                                compra5.save(function (err) {
                                    if (err) { console.log(err); } else {
                                        console.log('compra5 guardada');
                                        compra6.save(function (err) {
                                            if (err) { console.log(err); } else {
                                                console.log('compra6 guardada');
                                                callback();
                                            }
                                            })   
                                    }
                                    })    
                            }
                            })    
                    }
                    })    
            }

            })}
        })
    
};

const updateCompra = function(cb){
    Compra.updateMany({formaDePago : "ef"},{$set: {formaDePago :"efectivo"}},function(err,result){
        assert.equal(err,null);
        console.log("Update the document changing ef por efectivo");
        cb(result);
    });
}

const removeCompra = function(nc,cb){
    Compra.deleteOne({nroCompra: nc}, function(err,result){
        assert.equal(err,null);
        console.log("Remove the document with the field nrocompra equal to "+nc);
        cb(result);
    });
}

const removeAllCompras = function(cb){
    Compra.deleteMany({},function(err,result){
        console.log("Remove all documents")
        cb(result);
    });
}

