import {Entity, model, property} from '@loopback/repository';

@model()
export class Author extends Entity {
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
  tile: string;

  @property({
    type: 'string',
    required: true,
  })
  author_image: string;

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
    default: () => new Date()
  })
  created?: string;

  @property({
    type: 'date',
    required: false,
    default: () => new Date()
  })
  modified?: string;
  _id: any;
  static request: any;


  constructor(data?: Partial<Author>) {
    super(data);
  }
}

export interface AuthorRelations {
  // describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
