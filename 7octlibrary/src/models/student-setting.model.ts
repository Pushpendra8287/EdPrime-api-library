import {Entity, model, property} from '@loopback/repository';

@model()
export class StudentSetting extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',

  })
  libraryId?: string;

  @property({
    type: 'number',
    default: 1,
  })
  cb_max_checkout_type1?: number;

  @property({
    type: 'number',
    default: 10,
  })
  cb_max_borrow_allow_days1?: number;

  @property({
    type: 'string',
    default: 2,
  })
  cb_reminder_days1?: string;

  @property({
    type: 'string',
    default: 'everyhour',
  })
  cb_overdue_reminder_freq1?: string;

  @property({
    type: 'number',
    default: 2,
  })
  res_max_reserve_qty1?: number;

  @property({
    type: 'number',
    default: 24,
  })
  res_max_threshold_reserve1?: number;

  @property({
    type: 'string',
    default: 4,
  })
  res_max_threshold_reserve_quash_notify1?: string;

  @property({
    type: 'number',
    default: 1,
  })
  renew_max_for_each_borrowing1?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  renew_allowed_postduedate1?: boolean;

  @property({
    type: 'boolean',
    default: true,
  })
  renew_waive_fine_allowed_postduedate1?: boolean;

  @property({
    type: 'number',
    default: 10,
  })
  delay_perday_fine_amount1?: number;

  @property({
    type: 'number',
    default: 300,
  })
  delay_max_fine_amount1?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  delay_fine_waiver_allowed1?: boolean;

  @property({
    type: 'number',
    default: 200,
  })
  delay_max_fine_waiver_amount1?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  bh_enable_bad_health_charge1?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  bh_enable_shift_scrap?: boolean;

  @property({
    type: 'string',
  })
  mp_default_mem_plan1?: string;

  @property({
    type: 'boolean',
  })
  mp_enable_mem_access?: boolean;

  constructor(data?: Partial<StudentSetting>) {
    super(data);
  }
}

export interface StudentSettingRelations {
  // describe navigational properties here
}

export type StudentSettingWithRelations = StudentSetting &
  StudentSettingRelations;
