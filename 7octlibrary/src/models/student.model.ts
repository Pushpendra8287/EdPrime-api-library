import {Entity, hasMany, model, property} from '@loopback/repository';
import {LibrarySettings} from './library-settings.model';

@model()
export class Student extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  user_role?: string[];

  @property({
    type: 'string',
    required: true,
  })
  contact_no: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  father_name: string;

  @property({
    type: 'string',
    required: true,
  })
  class: string;

  @property({
    type: 'string',
    required: true,
  })
  stream?: string;

  @property({
    type: 'string',
    required: true,
  })
  section: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  age: string;

  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
  })
  created_At?: string;

  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
  })
  modified_At?: string;
  id: any;
  studentName: any;

  @hasMany(() => LibrarySettings, {keyTo: 'admin_id'})
  librarySettings: LibrarySettings[];

  constructor(data?: Partial<Student>) {
    super(data);
  }
}

export interface StudentRelations {
  // describe navigational properties here
}

export type StudentWithRelations = Student & StudentRelations;
