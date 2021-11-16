import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent implements OnInit {
  compra = {id:0};
  constructor(private comprasService: ComprasService,
    private router: Router ) { }

  ngOnInit(): void {}

  createCompra(){
    this.comprasService.createCompra(this.compra).subscribe(
      res=>{console.log(res)},
      err=>{console.log(err)}
    )
  }
}
