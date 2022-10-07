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
  BookItems,
} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationBookItemsController {
  constructor(
    @repository(ReservationRepository) protected reservationRepository: ReservationRepository,
  ) { }

  @get('/reservations/{id}/book-items', {
    responses: {
      '200': {
        description: 'Array of Reservation has many BookItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookItems)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BookItems>,
  ): Promise<BookItems[]> {
    return this.reservationRepository.bookItems(id).find(filter);
  }

  @post('/reservations/{id}/book-items', {
    responses: {
      '200': {
        description: 'Reservation model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookItems)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Reservation.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {
            title: 'NewBookItemsInReservation',
            exclude: ['_id'],
            optional: ['reservationId']
          }),
        },
      },
    }) bookItems: Omit<BookItems, 'id'>,
  ): Promise<BookItems> {
    return this.reservationRepository.bookItems(id).create(bookItems);
  }

  @patch('/reservations/{id}/book-items', {
    responses: {
      '200': {
        description: 'Reservation.BookItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {partial: true}),
        },
      },
    })
    bookItems: Partial<BookItems>,
    @param.query.object('where', getWhereSchemaFor(BookItems)) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.reservationRepository.bookItems(id).patch(bookItems, where);
  }

  @del('/reservations/{id}/book-items', {
    responses: {
      '200': {
        description: 'Reservation.BookItems DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookItems)) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.reservationRepository.bookItems(id).delete(where);
  }
}
