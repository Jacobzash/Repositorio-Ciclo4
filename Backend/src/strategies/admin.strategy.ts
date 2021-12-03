import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';



export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'administrador';

  constructor(
    @service(AutenticacionService)
    public servivioAutenticacion: AutenticacionService,
  ) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servivioAutenticacion.validartoken(token);

      if (datos.data.es_directivo == 1) {
        let perfil: UserProfile = Object.assign({
          nombres: datos.data.nombres,
        });
        return perfil;
      }
      else {
        throw new HttpErrors[401]("Token invalido o perfil no valido");
      }
    }
    else {
      throw new HttpErrors[401]("no se ha incluido token");
    }
  }
}
