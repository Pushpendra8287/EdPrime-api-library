import {HttpErrors} from '@loopback/rest';
import * as isEmail from 'isemail';
import {Credentials} from '../repositories/student.repository';

export function validateCredentials(credentials: Credentials) {

  if (!isEmail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('Invalid Email');

  }

  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('Password should be greater then 8 '
    );
  }
  if (credentials.contact_no.length < 10 || credentials.contact_no.length > 14) {
    throw new HttpErrors.UnprocessableEntity('Cntact_no  should be greater then 10 and less then 14'
    );
  }
}
