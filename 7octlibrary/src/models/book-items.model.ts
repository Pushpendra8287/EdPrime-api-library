import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {BookLending} from './book-lending.model';
import {Book} from './book.model';
import {LocationMaster} from './location-master.model';
import {Reservation} from './reservation.model';

@model()
export class BookItems extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // book_id: string;

  @property({
    type: 'number',
    required: true,
  })
  barcode: number;

  @property({
    type: 'string',
    required: true,
  })
  publishing_year: string;

  @property({
    type: 'date',
    required: true,
  })
  acquisition_date: string;

  @property({
    type: 'string',
    required: true,
  })
  acquisition_reference: string;

  @property({
    type: 'number',
    required: true,
  })
  acquisition_cost: number;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // location_id: string;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  mrp: number;

  @property({
    type: 'string',
    required: true,
  })
  book_health: string;

  @hasMany(() => BookLending)
  bookLendings: BookLending[];
  @property({
    type: 'boolean',
    required: true,
  })
  scrap_flag: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  landing_status: boolean;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // reservation_id: string;

  @property({
    type: 'boolean',
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

  @belongsTo(() => Book)
  bookId: string;

  @belongsTo(() => LocationMaster)
  locationMasterId: string;

  @belongsTo(() => Reservation)
  reservationId: string;

  constructor(data?: Partial<BookItems>) {
    super(data);
  }
}

export interface BookItemsRelations {
  // describe navigational properties here
}

export type BookItemsWithRelations = BookItems & BookItemsRelations;
