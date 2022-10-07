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
  BookCategory,
  Book,
} from '../models';
import {BookCategoryRepository} from '../repositories';

export class BookCategoryBookController {
  constructor(
    @repository(BookCategoryRepository) protected bookCategoryRepository: BookCategoryRepository,
  ) { }

  @get('/book-categories/{id}/books', {
    responses: {
      '200': {
        description: 'Array of BookCategory has many Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Book)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Book>,
  ): Promise<Book[]> {
    return this.bookCategoryRepository.books(id).find(filter);
  }

  @post('/book-categories/{id}/books', {
    responses: {
      '200': {
        description: 'BookCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof BookCategory.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInBookCategory',
            exclude: ['_id'],
            optional: ['bookCategoryId']
          }),
        },
      },
    }) book: Omit<Book, '_id'>,
  ): Promise<Book> {
    return this.bookCategoryRepository.books(id).create(book);
  }

  @patch('/book-categories/{id}/books', {
    responses: {
      '200': {
        description: 'BookCategory.Book PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Partial<Book>,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookCategoryRepository.books(id).patch(book, where);
  }

  @del('/book-categories/{id}/books', {
    responses: {
      '200': {
        description: 'BookCategory.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookCategoryRepository.books(id).delete(where);
  }
}
