import {Entity, model, property} from '@loopback/repository';

@model()
export class BookFine extends Entity {
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
  book_lending_id: string;

  @property({
    type: 'number',
  })
  fine_charges_collected?: number;

  @property({
    type: 'string',
  })
  payment_mode?: string;

  @property({
    type: 'number',
  })
  transaction_number?: number;

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

  constructor(data?: Partial<BookFine>) {
    super(data);
  }
}

export interface BookFineRelations {
  // describe navigational properties here
}

export type BookFineWithRelations = BookFine & BookFineRelations;
