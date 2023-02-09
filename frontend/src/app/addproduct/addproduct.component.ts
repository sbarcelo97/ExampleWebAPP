import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  nuevo_producto={'monto':0,'codigo':0};
  constructor(public dialog_ref:MatDialogRef<AddproductComponent>) {

   }


  ngOnInit(): void {
  }

  agregar(codigo: string,monto: string){
    if(codigo && monto){
      this.nuevo_producto['codigo']=parseInt(codigo);
      this.nuevo_producto['monto']=parseInt(monto);
      this.dialog_ref.close(this.nuevo_producto)
    }else{
      alert('Producto incorrecto, por favor complete los datos');
    }
  }

}
