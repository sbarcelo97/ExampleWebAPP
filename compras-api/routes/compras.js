var express = require('express');
var ctrlCompras = require('../model/Compras');
var router = express.Router();


router.post('/', ctrlCompras.comprasCreate);
router.get('/:nroCompra', ctrlCompras.comprasReadOne);
router.get('/',ctrlCompras.comprasReadAll);
router.put('/:nroCompra', ctrlCompras.comprasUpdateOne);
router.delete('/:nroCompra', ctrlCompras.comprasDeleteOne);
router.get('/fdp/:formaDePago', ctrlCompras.comprasListByFormaDePago);

module.exports = router;