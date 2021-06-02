var express = require('express');
var ctrlCompras = require('./controllers/compras');
var router = express.Router();

router.post('/compras', ctrlCompras.comprasCreate);
router.get('/compras/:nroCompra', ctrlCompras.comprasReadOne);
router.put('/compras/:nroCompra', ctrlCompras.comprasUpdateOne);
router.delete('/compras/:nroCompra', ctrlCompras.comprasDeleteOne);
router.get('/compras', ctrlCompras.comprasListByFormaDePago);

module.exports = router;