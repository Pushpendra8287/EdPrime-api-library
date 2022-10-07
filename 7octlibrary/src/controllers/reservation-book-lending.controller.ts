import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Reservation,
  BookLending,
} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationBookLendingController {
  constructor(
    @repository(ReservationRepository) protected reservationRepository: ReservationRepository,
  ) { }

  @get('/reservations/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Array of Reservation has many BookLending',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookLending)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BookLending>,
  ): Promise<BookLending[]> {
    return this.reservationRepository.bookLendings(id).find(filter);
  }

  @post('/reservations/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Reservation model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookLending)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Reservation.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {
            title: 'NewBookLendingInReservation',
            exclude: ['_id'],
            optional: ['reservationId']
          }),
        },
      },
    }) bookLending: Omit<BookLending, '_id'>,
  ): Promise<BookLending> {
    return this.reservationRepository.bookLendings(id).create(bookLending);
  }

  @patch('/reservations/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Reservation.BookLending PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {partial: true}),
        },
      },
    })
    bookLending: Partial<BookLending>,
    @param.query.object('where', getWhereSchemaFor(BookLending)) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.reservationRepository.bookLendings(id).patch(bookLending, where);
  }

  @del('/reservations/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Reservation.BookLending DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookLending)) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.reservationRepository.bookLendings(id).delete(where);
  }
}
