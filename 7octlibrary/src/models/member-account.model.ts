import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Member} from './member.model';

@model()
export class MemberAccount extends Entity {
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
  membership_plan: string;

  @property({
    type: 'date',
    required: true,
  })
  validity_from_date: string;

  @property({
    type: 'date',
    required: true,
  })
  validity_till_date: string;

  @belongsTo(() => Member)
  memberId: string;
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

  constructor(data?: Partial<MemberAccount>) {
    super(data);
  }
}

export interface MemberAccountRelations {
  // describe navigational properties here
}

export type MemberAccountWithRelations = MemberAccount & MemberAccountRelations;
