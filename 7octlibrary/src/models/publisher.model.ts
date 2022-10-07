import {Entity, hasMany, model, property} from '@loopback/repository';
import {Book} from './book.model';

@model()
export class Publisher extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  publisher_image: string;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  created_by: string;

  @property({
    type: 'string',
  })
  modified_by?: string;

  @property({
    type: 'date',
  })
  deleted_on?: string;

  @property({
    type: 'string',
  })
  deleted_by?: string;

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

  @hasMany(() => Book)
  books: Book[];

  constructor(data?: Partial<Publisher>) {
    super(data);
  }
}

export interface PublisherRelations {
  // describe navigational properties here
}

export type PublisherWithRelations = Publisher & PublisherRelations;
