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
import {BookFine, BookLending} from '../models';
import {BookLendingRepository} from '../repositories';

export class BookLendingBookFineController {
  constructor(
    @repository(BookLendingRepository)
    protected bookLendingRepository: BookLendingRepository,
  ) {}

  @get('/book-lendings/{id}/book-fines', {
    responses: {
      '200': {
        description: 'Array of BookLending has many BookFine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookFine)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BookFine>,
  ): Promise<BookFine[]> {
    return this.bookLendingRepository.bookFines(id).find(filter);
  }

  @post('/book-lendings/{id}/book-fines', {
    responses: {
      '200': {
        description: 'BookLending model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookFine)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof BookLending.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookFine, {
            title: 'NewBookFineInBookLending',
            exclude: ['_id'],
            optional: ['book_lending_id'],
          }),
        },
      },
    })
    bookFine: Omit<BookFine, '_id'>,
  ): Promise<BookFine> {
    return this.bookLendingRepository.bookFines(id).create(bookFine);
  }

  @patch('/book-lendings/{id}/book-fines', {
    responses: {
      '200': {
        description: 'BookLending.BookFine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookFine, {partial: true}),
        },
      },
    })
    bookFine: Partial<BookFine>,
    @param.query.object('where', getWhereSchemaFor(BookFine))
    where?: Where<BookFine>,
  ): Promise<Count> {
    return this.bookLendingRepository.bookFines(id).patch(bookFine, where);
  }

  @del('/book-lendings/{id}/book-fines', {
    responses: {
      '200': {
        description: 'BookLending.BookFine DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookFine))
    where?: Where<BookFine>,
  ): Promise<Count> {
    return this.bookLendingRepository.bookFines(id).delete(where);
  }
}
