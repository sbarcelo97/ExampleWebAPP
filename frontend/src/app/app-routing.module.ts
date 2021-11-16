import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components

import { ComprasComponent } from './components/compras/compras.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/compras',
    pathMatch: 'full'
  },
  {
    path: 'compras',
    component: ComprasComponent
  }];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
