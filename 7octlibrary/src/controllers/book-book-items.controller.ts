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
  BookItems,
} from '../models';
import {BookRepository} from '../repositories';

export class BookBookItemsController {
  constructor(
    @repository(BookRepository) protected bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/book-items', {
    responses: {
      '200': {
        description: 'Array of Book has many BookItems',
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
    return this.bookRepository.bookItems(id).find(filter);
  }

  @post('/books/{id}/book-items', {
    responses: {
      '200': {
        description: 'Book model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookItems)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Book.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {
            title: 'NewBookItemsInBook',
            exclude: ['_id'],
            optional: ['bookId']
          }),
        },
      },
    }) bookItems: Omit<BookItems, 'id'>,
  ): Promise<BookItems> {
    return this.bookRepository.bookItems(id).create(bookItems);
  }

  @patch('/books/{id}/book-items', {
    responses: {
      '200': {
        description: 'Book.BookItems PATCH success count',
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
    return this.bookRepository.bookItems(id).patch(bookItems, where);
  }

  @del('/books/{id}/book-items', {
    responses: {
      '200': {
        description: 'Book.BookItems DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookItems)) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.bookRepository.bookItems(id).delete(where);
  }
}
