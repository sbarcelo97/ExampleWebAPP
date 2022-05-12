import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent implements OnInit {
    compra :Compra = new Compra(0,"",0,[{codigo:0, monto:0}]);
  constructor(public comprasService: ComprasService,
    private router: Router ) { }

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
        this.comprasService.compras = res;
      },
    )
  }

}
