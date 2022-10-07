import {belongsTo, Entity, model, property} from '@loopback/repository';
import {BookItems} from './book-items.model';
import {Member} from './member.model';
import {Reservation} from './reservation.model';

@model()
export class BookLending extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  usertype?: string; //this is userId

  @property({
    type: 'boolean',
    default: false
  })
  isSubmitted?: boolean;

  @property({
    type: 'boolean',
  })
  membership: boolean;

  @belongsTo(() => BookItems)
  bookItemsId: string;

  @belongsTo(() => Member)
  memberId: string;

  @belongsTo(() => Reservation)
  reservationId: string;
  @property({
    type: 'Date',
  })
  due_date: Date;

  @property({
    type: 'Date',
    default: () => null,
  })
  return_date?: Date;

  @property({
    type: 'number',
  })
  fine_charge?: number;

  @property({
    type: 'number',

  })
  damage_charges?: number;

  @property({
    type: 'number',
  })
  waived_amount?: number;

  @property({
    type: 'number',
  })
  net_amount?: number;

  @property({
    type: 'string',
  })
  received_by: string;

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
    type: 'string',
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


  constructor(data?: Partial<BookLending>) {
    super(data);
  }
}

export interface BookLendingRelations {
  // describe navigational properties here
}

export type BookLendingWithRelations = BookLending & BookLendingRelations;
