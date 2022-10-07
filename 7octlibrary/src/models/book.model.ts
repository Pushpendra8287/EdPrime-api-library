import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Author} from './author.model';
import {BookCategory} from './book-category.model';
import {BookItems} from './book-items.model';
import {EdClass} from './ed-class.model';
import {Genre} from './genre.model';
import {Language} from './language.model';
import {Publisher} from './publisher.model';
import {Reservation} from './reservation.model';
import {Subject} from './subject.model';

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
  book_title: string;

  @belongsTo(() => Author)
  authorId: string;

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

  @belongsTo(() => Publisher)
  publisherId: string;

  @belongsTo(() => Subject)
  subjectId: string;

  @belongsTo(() => BookCategory)
  bookCategoryId: string;

  @belongsTo(() => Genre)
  genreId: string;

  @belongsTo(() => Language)
  languageId: string;

  @belongsTo(() => EdClass)
  edClassId: string;

  @hasMany(() => BookItems)
  bookItems: BookItems[];

  @hasMany(() => Reservation)
  reservations: Reservation[];


  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
