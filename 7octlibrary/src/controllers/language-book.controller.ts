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
  Language,
  Book,
} from '../models';
import {LanguageRepository} from '../repositories';

export class LanguageBookController {
  constructor(
    @repository(LanguageRepository) protected languageRepository: LanguageRepository,
  ) { }

  @get('/languages/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Language has many Book',
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
    return this.languageRepository.books(id).find(filter);
  }

  @post('/languages/{id}/books', {
    responses: {
      '200': {
        description: 'Language model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Language.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInLanguage',
            exclude: ['_id'],
            optional: ['languageId']
          }),
        },
      },
    }) book: Omit<Book, '_id'>,
  ): Promise<Book> {
    return this.languageRepository.books(id).create(book);
  }

  @patch('/languages/{id}/books', {
    responses: {
      '200': {
        description: 'Language.Book PATCH success count',
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
    return this.languageRepository.books(id).patch(book, where);
  }

  @del('/languages/{id}/books', {
    responses: {
      '200': {
        description: 'Language.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.languageRepository.books(id).delete(where);
  }
}
