import {Entity, hasMany, model, property} from '@loopback/repository';
import {BookLending} from './book-lending.model';
import {MemberAccount} from './member-account.model';
import {Reservation} from './reservation.model';

@model()
export class Member extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  member_type: string;

  @property({
    type: 'string',
    required: true,
  })
  sso_id: string;

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
    required: true,
  })
  modified_by: string;

  @property({
    type: 'date',
    required: true,
  })
  deleted_on: string;

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

  @hasMany(() => MemberAccount)
  memberAccounts: MemberAccount[];

  @hasMany(() => Reservation)
  reservations: Reservation[];

  @hasMany(() => BookLending)
  bookLendings: BookLending[];


  constructor(data?: Partial<Member>) {
    super(data);
  }
}

export interface MemberRelations {
  // describe navigational properties here
}

export type MemberWithRelations = Member & MemberRelations;
