import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import generador from "password-generator";
import {Llaves} from '../config/llaves';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
const encriptar = require("crypto-js"); //forma tambien para importar
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  /*
   * Add service methods here
   */

  generarClave() {
    let clave = generador(8, false);
    return clave;
  }

  cifrarClave(clave: string) {
    let calvecifrada = encriptar.MD5(clave).toString();
    return calvecifrada;
  }

  identificarEmpleados(email: string, clave: string) {
    try {
      let p = this.empleadoRepository.findOne({where: {email: email, clave: clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
  //se importa el modelo de empleado para acceder a los campos de empleado
  generarToken(Empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: Empleado.id,
        correo: Empleado.email,
        nombres: Empleado.nombres,
        es_directivo: Empleado.es_directivo
      }

    },
      Llaves.clavejwt);
    return token;
  }


  validartoken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.clavejwt);
      return datos;
    } catch {
      return false;
    }
  }
}
