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
  Book,
  Reservation,
} from '../models';
import {BookRepository} from '../repositories';

export class BookReservationController {
  constructor(
    @repository(BookRepository) protected bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/reservations', {
    responses: {
      '200': {
        description: 'Array of Book has many Reservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reservation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.bookRepository.reservations(id).find(filter);
  }

  @post('/books/{id}/reservations', {
    responses: {
      '200': {
        description: 'Book model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Book.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservationInBook',
            exclude: ['_id'],
            optional: ['bookId']
          }),
        },
      },
    }) reservation: Omit<Reservation, '_id'>,
  ): Promise<Reservation> {
    return this.bookRepository.reservations(id).create(reservation);
  }

  @patch('/books/{id}/reservations', {
    responses: {
      '200': {
        description: 'Book.Reservation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Partial<Reservation>,
    @param.query.object('where', getWhereSchemaFor(Reservation)) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.bookRepository.reservations(id).patch(reservation, where);
  }

  @del('/books/{id}/reservations', {
    responses: {
      '200': {
        description: 'Book.Reservation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reservation)) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.bookRepository.reservations(id).delete(where);
  }
}
