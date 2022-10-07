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
  BookItems,
  BookLending,
} from '../models';
import {BookItemsRepository} from '../repositories';

export class BookItemsBookLendingController {
  constructor(
    @repository(BookItemsRepository) protected bookItemsRepository: BookItemsRepository,
  ) { }

  @get('/book-items/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Array of BookItems has many BookLending',
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
    return this.bookItemsRepository.bookLendings(id).find(filter);
  }

  @post('/book-items/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'BookItems model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookLending)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof BookItems.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {
            title: 'NewBookLendingInBookItems',
            exclude: ['_id'],
            optional: ['bookItemsId']
          }),
        },
      },
    }) bookLending: Omit<BookLending, '_id'>,
  ): Promise<BookLending> {
    return this.bookItemsRepository.bookLendings(id).create(bookLending);
  }

  @patch('/book-items/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'BookItems.BookLending PATCH success count',
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
    return this.bookItemsRepository.bookLendings(id).patch(bookLending, where);
  }

  @del('/book-items/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'BookItems.BookLending DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookLending)) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.bookItemsRepository.bookLendings(id).delete(where);
  }
}
