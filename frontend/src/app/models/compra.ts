export class Compra {
    constructor( nroCompra= 0, formadepago = "", montototal = 0, products: [{ codigo:0,monto:0 }]) {
      this.nroCompra=nroCompra;
      this.products = products;
      this.formadepago = formadepago;
      this.montototal = montototal;
    }
  
    nroCompra : number;
    products : [{codigo: number, monto: number}];
    formadepago: string;
    montototal: number;
  }