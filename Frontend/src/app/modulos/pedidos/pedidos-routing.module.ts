import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarPedidosComponent } from './asignar-pedidos/asignar-pedidos.component';

const routes: Routes = [
  {
    path: 'asignar-pedidos',
    component: AsignarPedidosComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
