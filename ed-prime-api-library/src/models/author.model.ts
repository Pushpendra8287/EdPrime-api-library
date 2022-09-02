import {Entity, model, property} from '@loopback/repository';

@model()
export class Author extends Entity {
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
  author_image: string;

  @property({
    type: 'string',
    default: true,
  })
  status?: string;

  @property({
    type: 'date',
  })
  created_on?: string;

  @property({
    type: 'string',
  })
  created_by?: string;

  @property({
    type: 'date',
  })
  modified_on?: string;

  @property({
    type: 'string',
  })
  modified_by?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isDelted?: boolean;

  @property({
    type: 'date',
  })
  deleted_on?: string;

  @property({
    type: 'string',
  })
  deleted_by?: string;


  constructor(data?: Partial<Author>) {
    super(data);
  }
}

export interface AuthorRelations {
  // describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
