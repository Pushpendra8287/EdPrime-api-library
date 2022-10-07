import {RequestBodyObject, SchemaObject} from '@loopback/rest';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      default: ""

    },
    e_fineDealydeposite: {
      type: 'string',
      default: ""
    },
    e_bookreservation: {
      type: 'string',
      default: ""
    },
    e_book_scrapping: {
      type: 'string',
      default: ""
    },
    e_renew_fun: {
      type: 'string',
      default: ""
    },
    e_book_health_assesment: {
      type: 'string',
      default: ""
    },
    e_bar_qrcode: {
      type: 'string',
      default: ""
    },
    max_books_checkout: {
      type: 'number',
      default: ""
    },
    max_days_borrow: {
      type: 'number',
      default: ""
    },
    send_reminder_borrow: {
      type: 'number',
      default: ""
    },
    send_reminder_overdue: {
      type: 'string',
      default: ""
    },
    max_res_memeber: {
      type: 'number',
      default: ""
    },
    max_threshold_booking: {
      type: 'number',
      default: ""
    },
    send_rem_reservation: {
      type: 'number',
      default: ""
    },
    renewal_allowed_issuance: {
      type: 'number',
      default: ""
    },
    renewal_allowed_duedate: {
      type: 'string',
      default: ""
    },
    fine_charges_renewal: {
      type: 'string',
      default: ""
    },
    per_day_charges: {
      type: 'number',
      default: ""
    },
    max_fine_charges: {
      type: 'number',
      default: ""
    },
    fine_charges_allowed: {
      type: 'string',
      default: ""
    },
    max_waiver_allowed: {
      type: 'number',
      default: ""
    },
    e_bookhealth_charges_return: {
      type: 'string',
      default: ""
    },
    e_book_shift_deposition: {
      type: 'string',
      default: ""
    },
    d_membership_plan: {
      type: 'string',
      default: ""
    },
    e_access_memebers: {
      type: 'string',
      default: ""
    },
    generate_bar_qrcode_books: {
      type: 'string',
      default: ""
    },
    generate_bar_qrcode_members: {
      type: 'string',
      default: ""
    }
  },
};
export const PayloadRequestBody: RequestBodyObject = {
  description: 'The input of library update',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  }
}
