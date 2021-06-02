var express = requiere('express');
var router = express.Router();
var ctrlCompras = requiere('../controllers/compras.js');

router.post('/compras', ctrlCompras.comprasCreate);
router.get('/compras/:nroCompra', ctrlCompras.comprasReadOne);
router.put('/compras/:nroCompra', ctrlCompras.comprasUpdateOne);
router.delete('/compras/:nroCompra', ctrlCompras.comprasDeleteOne);
router.get('/compras', ctrlCompras.comprasListByFormaDePago);

export default router;