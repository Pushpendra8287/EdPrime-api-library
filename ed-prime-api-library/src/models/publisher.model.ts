import {Entity, model, property, hasMany} from '@loopback/repository';
import {Book} from './book.model';

@model()
export class Publisher extends Entity {
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

  @hasMany(() => Book, {keyTo: 'publisher_id'})
  books: Book[];

  constructor(data?: Partial<Publisher>) {
    super(data);
  }
}

export interface PublisherRelations {
  // describe navigational properties here
}

export type PublisherWithRelations = Publisher & PublisherRelations;
