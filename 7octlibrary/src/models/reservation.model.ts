import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {BookItems} from './book-items.model';
import {BookLending} from './book-lending.model';
import {Book} from './book.model';
import {Member} from './member.model';

@model()
export class Reservation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @belongsTo(() => Member)
  memberId: string;

  @hasMany(() => BookLending)
  bookLendings: BookLending[];
  @property({
    type: 'date',
    required: true,
  })
  valid_till: string;

  @property({
    type: 'boolean',
  })
  status?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  created_on: string;

  @property({
    type: 'string',
    required: true,
  })
  created_by: string;

  @property({
    type: 'date',
  })
  modified_on?: string;

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

  @hasMany(() => BookItems)
  bookItems: BookItems[];

  @belongsTo(() => Book)
  bookId: string;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
