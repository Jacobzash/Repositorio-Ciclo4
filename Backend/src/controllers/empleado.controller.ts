import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Credenciales, Empleado} from '../models';
import {EmpleadoRepository, MensajesEmpleadosRepository} from '../repositories';
import {AutenticacionService, NotificacionsmsService} from '../services';

@authenticate("administrador")
export class EmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
    @service(AutenticacionService)
    public servivioAutenticacion: AutenticacionService,
    @repository(MensajesEmpleadosRepository)
    public guardarmensaje: MensajesEmpleadosRepository,
    @service(NotificacionsmsService)
    public notificacionsms: NotificacionsmsService,
    @service(AutenticacionService)
    public autenticacionService: AutenticacionService,

  ) { }

  @authenticate.skip()
  @post('/login', {
    responses: {
      '200': {
        description: "validacion de usuario"
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ) {
    let p = await this.autenticacionService.identificarEmpleados(credenciales.email, credenciales.clave);
    if (p) {
      let token = this.autenticacionService.generarToken(p);
      return {
        datos: {
          nombres: p.nombres,
          email: p.email,
          id: p.id,
          token: token
        }
      }
    } else {
      throw new HttpErrors[401]("datos incorrectos");
    }
  }

  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {

    let clave = this.servivioAutenticacion.generarClave();
    let clavecifrada = this.servivioAutenticacion.cifrarClave(clave);
    empleado.clave = clavecifrada;
    let empleadocreado = await this.empleadoRepository.create(empleado);
    let msm = "Hola " + empleadocreado.nombres + " su clave es :" + clave;
    var objmensaje = {
      mensaje: msm,
      empleadoId: empleadocreado.id
    };
    this.guardarmensaje.create(objmensaje);
    this.notificacionsms.EnviarSMS(empleado.telefono, msm);

    return empleadocreado;

  }

  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
