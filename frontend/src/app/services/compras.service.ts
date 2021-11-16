import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private URL = 'http://localhost:3000/compras';

  constructor(private http: HttpClient, private router: Router) { }

  // signUpUser(user) {
  //   return this.http.post<any>(this.URL + '/signup', user);
  // }
    createCompra(compra: {}){
      console.log("creando compra")
      return this.http.post<any>(this.URL , compra)
      
    }

}
