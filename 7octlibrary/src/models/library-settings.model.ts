import {Entity, model, property} from '@loopback/repository';

@model()
export class LibrarySettings extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  admin_id?: string;

  @property({
    type: 'boolean',
    defalut: false,
  })
  e_fineDealydeposite?: boolean;

  @property({
    type: 'boolean',
    defalut: false,
  })
  e_bookreservation?: boolean;

  @property({
    type: 'boolean',
    defalut: false,
  })
  e_book_scrapping?: boolean;

  @property({
    type: 'boolean',
    defalut: false,
  })
  e_renew_fun?: boolean;

  @property({
    type: 'boolean',
    defalut: false,
  })
  e_book_health_assesment?: boolean;

  @property({
    type: 'boolean',
    defalut: false,
  })
  e_bar_qrcode?: boolean;

  // @property({
  //   type: 'number',
  // })
  // max_books_checkout?: number;

  // @property({
  //   type: 'number',
  // })
  // max_days_borrow?: number;

  // @property({
  //   type: 'number',
  // })
  // send_reminder_borrow?: number;

  // @property({
  //   type: 'string',
  // })
  // send_reminder_overdue?: string;

  // @property({
  //   type: 'number',
  // })
  // max_res_memeber?: number;

  // @property({
  //   type: 'number',
  // })
  // max_threshold_booking?: number;

  // @property({
  //   type: 'number',
  // })
  // send_rem_reservation?: number;

  // @property({
  //   type: 'number',
  // })
  // renewal_allowed_issuance?: number;

  // @property({
  //   type: 'boolean',
  //   default: false
  // })
  // renewal_allowed_duedate?: boolean;

  // @property({
  //   type: 'boolean',
  //   default: false
  // })
  // fine_charges_renewal?: boolean;

  // @property({
  //   type: 'number',
  // })
  // per_day_charges?: number;

  // @property({
  //   type: 'number',
  // })
  // max_fine_charges?: number;

  // @property({
  //   type: 'boolean',
  //   default: false
  // })
  // fine_charges_allowed?: boolean;

  // @property({
  //   type: 'number',
  // })
  // max_waiver_allowed?: number;

  // @property({
  //   type: 'boolean',
  //   default: false
  // })
  // e_bookhealth_charges_return?: boolean;

  // @property({
  //   type: 'boolean',
  //   default: false
  // })
  // e_book_shift_deposition?: boolean;

  // @property({
  //   type: 'string',
  // })
  // d_membership_plan?: string;

  // @property({
  //   type: 'string',
  // })
  // e_access_memebers?: string;

  // @property({
  //   type: 'string',
  // })
  // generate_bar_qrcode_books?: string;

  // @property({
  //   type: 'string',
  // })
  // generate_bar_qrcode_members?: string;

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
  key: boolean;

  constructor(data?: Partial<LibrarySettings>) {
    super(data);
  }
}

export interface LibrarySettingsRelations {}

export type LibrarySettingsWithRelations = LibrarySettings &
  LibrarySettingsRelations;
