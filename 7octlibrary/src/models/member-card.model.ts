import {belongsTo, Entity, model, property} from '@loopback/repository';
import {MemberAccount} from './member-account.model';

@model({settings: {strict: false}})
export class MemberCard extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  barcode: number;

  @property({
    type: 'string',
    required: true,
  })
  member_account: string;

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
    type: 'string',
  })
  modified_by?: string;

  @property({
    type: 'date',
  })
  modified_on?: string;

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

  @belongsTo(() => MemberAccount)
  memberAccountId: string;


  constructor(data?: Partial<MemberCard>) {
    super(data);
  }
}

export interface MemberCardRelations {
}

export type MemberCardWithRelations = MemberCard & MemberCardRelations;
