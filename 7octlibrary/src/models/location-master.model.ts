import {Entity, hasMany, model, property} from '@loopback/repository';
import {BookItems} from './book-items.model';

@model()
export class LocationMaster extends Entity {
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
  friendly_accession: string;

  @property({
    type: 'string',
    required: true,
  })
  building: string;

  @property({
    type: 'string',
    required: true,
  })
  floor: string;

  @property({
    type: 'string',
    required: true,
  })
  section: string;

  @property({
    type: 'string',
    required: true,
  })
  rack: string;

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

  constructor(data?: Partial<LocationMaster>) {
    super(data);
  }
}

export interface LocationMasterRelations {
  // describe navigational properties here
}

export type LocationMasterWithRelations = LocationMaster &
  LocationMasterRelations;
