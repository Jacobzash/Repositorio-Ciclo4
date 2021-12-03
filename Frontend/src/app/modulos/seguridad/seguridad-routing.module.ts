import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioclaveComponent } from './cambioclave/cambioclave.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarclaveComponent } from './recuperarclave/recuperarclave.component';

const routes: Routes = [
  {
    path: 'cambioclave',
    component: CambioclaveComponent

  },
  {
    path: 'identificacion',
    component: IdentificacionComponent

  },
  {
    path: 'recuperarclave',
    component: RecuperarclaveComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
