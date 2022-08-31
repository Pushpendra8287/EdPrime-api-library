import {Entity, model, property} from '@loopback/repository';

@model()
export class BookCategory extends Entity {
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


  constructor(data?: Partial<BookCategory>) {
    super(data);
  }
}

export interface BookCategoryRelations {
  // describe navigational properties here
}

export type BookCategoryWithRelations = BookCategory & BookCategoryRelations;
