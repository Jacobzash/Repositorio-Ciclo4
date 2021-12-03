import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { CambioclaveComponent } from './cambioclave/cambioclave.component';
import { RecuperarclaveComponent } from './recuperarclave/recuperarclave.component';


@NgModule({
  declarations: [
    IdentificacionComponent,
    CambioclaveComponent,
    RecuperarclaveComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
