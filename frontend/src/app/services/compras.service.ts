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

  // signUpUser(user) {
  //   return this.http.post<any>(this.URL + '/signup', user);
  // }
    createCompra(compra:Compra){
      console.log("creando compra")
      console.log(compra);
      this.compras.push(compra);
      return this.http.post<any>(this.URL , compra)
      
    }

    getCompras(){
      console.log(this.http.get(this.URL));
      return  this.http.get<Compra[]>(this.URL);
    }

}
