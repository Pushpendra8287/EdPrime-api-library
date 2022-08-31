import {Entity, model, property} from '@loopback/repository';

@model()
export class Book extends Entity {
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
  book_title: string;

  @property({
    type: 'string',
    required: true,
  })
  category_id: string;

  @property({
    type: 'string',
    required: true,
  })
  publisher_id: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  author_id: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  genre_id: string[];

  @property({
    type: 'string',
    required: true,
  })
  language_id: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  class_id: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  subject_id: string[];

  @property({
    type: 'string',
    required: true,
  })
  isbn: string;

  @property({
    type: 'string',
    required: true,
  })
  book_Images: string;

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


  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
