import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reservation,
  Book,
} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationBookController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) { }

  @get('/reservations/{id}/book', {
    responses: {
      '200': {
        description: 'Book belonging to Reservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Book)},
          },
        },
      },
    },
  })
  async getBook(
    @param.path.string('id') id: typeof Reservation.prototype._id,
  ): Promise<Book> {
    return this.reservationRepository.book(id);
  }
}
