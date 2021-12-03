import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ModeloIdentificar } from '../modelos/identificar.modelo';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url = 'http://localhost:3000';
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) {
    this.VerificarSesionActual();

  }
  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if(datos){
      this.RefrescarDatos(datos);
    }
  }

  RefrescarDatos(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion;
  }



  Identificar(usuario:string,clave:string): Observable<ModeloIdentificar>{
    return this.http.post<ModeloIdentificar>(`${this.url}/login`,{
      email:usuario,
      clave:clave
    },{
      headers: new HttpHeaders({


      })
    })

  }

  AlmacenarSesion(datos: ModeloIdentificar){
    datos.estaIdentificado=true;
    let StringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion",StringDatos);
    this.RefrescarDatos(datos);
  }

  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }


  EliminarInformacionSession(){
    localStorage.removeItem("datosSesion");
    this.RefrescarDatos(new ModeloIdentificar());
  }


  SeHaIniciadoSesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

}
