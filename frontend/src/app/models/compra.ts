export class Compra {
    constructor( nroCompra= 0, formaDePago = "", montoTotal = 0, nroTarjeta=0, productos: [{ codigo:number,monto:number }]) {
      this.nroCompra=nroCompra;
      this.productos = productos;
      this.formaDePago = formaDePago;
      this.montoTotal = montoTotal;
      this.nroTarjeta = nroTarjeta;
    }
  
    nroCompra : number;
    productos : [{codigo: number, monto: number}];
    formaDePago: string;
    montoTotal: number;
    nroTarjeta: number;
  }