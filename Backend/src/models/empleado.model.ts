import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {MensajesEmpleados} from './mensajes-empleados.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo: number;

  @property({
    type: 'number',
    required: true,
  })
  es_directivo: number;

  @property({
    type: 'number',
    required: true,
  })
  es_cliente: number;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @hasMany(() => MensajesEmpleados)
  mensajesEmpleados: MensajesEmpleados[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;