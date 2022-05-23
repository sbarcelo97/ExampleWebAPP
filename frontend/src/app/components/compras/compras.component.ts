import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddproductComponent } from 'src/app/addproduct/addproduct.component';
import { Compra } from 'src/app/models/compra';
import { ComprasService } from 'src/app/services/compras.service';



@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent implements OnInit {
    compra :Compra = new Compra(0,"",0,[{codigo:0, monto:0}]);
    compras: Compra[] = [];
    formasdepago:  { [key: string]: string; } = {'Efectivo':'ef', 'Credito':'credito', 'Debito':'debito'}
    product_dialog: MatDialogRef<AddproductComponent> | undefined;

  constructor(public comprasService: ComprasService,
    private router: Router, public dialog:MatDialog ) { }

  ngOnInit(): void {
    this.getCompras();
  }

  createCompra(){
    this.comprasService.createCompra(this.compra).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('newCompra',res)
        this.router.navigate(['/compras'])
      },
      err=>{console.log(err)}
    )
  }

  getCompras(){
    this.comprasService.getCompras().subscribe(
      res=>{
        console.log(res)
        this.compras = res;
      },
    )
  }

  public consolelog(c:any){
    console.log(c);
  }

  public addProduct(){
    this.product_dialog = this.dialog.open(AddproductComponent,{});
    this.product_dialog.beforeClosed().subscribe(result =>{
      this.compra.products.push(result);
      this.compra.montototal = this.compra.montototal + result.monto;
      this.consolelog(this.compra.products)
    })
  }

  public deleteproduct(codigo:number,monto:number){
    let index=this.compra.products.indexOf({codigo,monto});
    this.compra.products.splice(index);
    this.compra.montototal = this.compra.montototal - monto;
  }

}
