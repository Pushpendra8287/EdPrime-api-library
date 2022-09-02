import {Entity, model, property, referencesMany} from '@loopback/repository';
import {Author} from './author.model';

@model()
export class Book extends Entity {
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
  categoryId: string;

  @property({
    type: 'string',
    required: true,
  })
  publisherId: string;
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  genreId: string[];

  @property({
    type: 'string',
    required: true,
  })
  languageId: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  ClasessId: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  subjectId: string[];

  @property({
    type: 'string',
    required: true,
  })
  isbn: string;

  @property({
    type: 'string',
  })
  BookImages?: string;

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
  isDeleted?: boolean;

  @property({
    type: 'date',
  })
  deleted_on?: string;

  @property({
    type: 'string',
  })
  deleted_by?: string;

  @referencesMany(() => Author, {name: 'Bookauthor'})
  authorId: string[];

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
