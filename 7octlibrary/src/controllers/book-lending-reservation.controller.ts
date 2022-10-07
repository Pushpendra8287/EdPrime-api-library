import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BookLending,
  Reservation,
} from '../models';
import {BookLendingRepository} from '../repositories';

export class BookLendingReservationController {
  constructor(
    @repository(BookLendingRepository)
    public bookLendingRepository: BookLendingRepository,
  ) { }

  @get('/book-lendings/{id}/reservation', {
    responses: {
      '200': {
        description: 'Reservation belonging to BookLending',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reservation)},
          },
        },
      },
    },
  })
  async getReservation(
    @param.path.string('id') id: typeof BookLending.prototype._id,
  ): Promise<Reservation> {
    return this.bookLendingRepository.reservation(id);
  }
}
