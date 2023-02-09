import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import {Compra} from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private URL = 'http://localhost:3000/compras';

  compras: Compra[] = [];
  selectedCompra!: Compra;

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.getCompras().subscribe()
  }

    createCompra(compra:Compra){
      this.compras.push(compra);
      return this.http.post<any>(this.URL , compra)
      
    }

    getCompras(){
      return  this.http.get<Compra[]>(this.URL);
    }

    deleteCompra(nroCompra:number){
      return this.http.delete(this.URL+'/'+nroCompra);
    }

    updateCompra(compra:Compra){
      return this.http.put(this.URL+'/'+compra.nroCompra,compra);
    }

}
