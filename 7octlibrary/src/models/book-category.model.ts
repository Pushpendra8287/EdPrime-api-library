import {Entity, hasMany, model, property} from '@loopback/repository';
import {Book} from './book.model';

@model()
export class BookCategory extends Entity {
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
  category_image: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'string',
    required: true,
  })
  created_by: string;

  @property({
    type: 'string',
    required: true,
  })
  modified_by: string;

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

  constructor(data?: Partial<BookCategory>) {
    super(data);
  }
}

export interface BookCategoryRelations {
  // describe navigational properties here
}

export type BookCategoryWithRelations = BookCategory & BookCategoryRelations;
