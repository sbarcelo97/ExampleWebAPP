var express = require('express');
var ctrlCompras = require('../model/Compras');
var router = express.Router();


router.post('/compras', ctrlCompras.comprasCreate);
router.get('/compras/:nroCompra', ctrlCompras.comprasReadOne);
router.get('/compras',ctrlCompras.comprasReadAll);
router.put('/compras/:nroCompra', ctrlCompras.comprasUpdateOne);
router.delete('/compras/:nroCompra', ctrlCompras.comprasDeleteOne);
router.get('/compras/:formaDePago', ctrlCompras.comprasListByFormaDePago);

module.exports = router;