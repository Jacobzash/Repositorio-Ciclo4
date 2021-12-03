import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioclaveComponent } from './cambioclave/cambioclave.component';
import { CerrarsesionComponent } from './cerrarsesion/cerrarsesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarclaveComponent } from './recuperarclave/recuperarclave.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'cambioclave',
    component: CambioclaveComponent,
    pathMatch: "full"

  },
  {
    path: 'identificacion',
    component: IdentificacionComponent,
    pathMatch: "full"

  },
  {
    path: 'recuperarclave',
    component: RecuperarclaveComponent,
    pathMatch: "full"

  },
  {
    path: 'cerrarsesion',
    component: CerrarsesionComponent,
    pathMatch: "full"

  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: "full"

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
