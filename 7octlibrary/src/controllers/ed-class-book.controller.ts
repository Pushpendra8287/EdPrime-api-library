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
  EdClass,
  Book,
} from '../models';
import {EdClassRepository} from '../repositories';

export class EdClassBookController {
  constructor(
    @repository(EdClassRepository) protected edClassRepository: EdClassRepository,
  ) { }

  @get('/ed-classes/{id}/books', {
    responses: {
      '200': {
        description: 'Array of EdClass has many Book',
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
    return this.edClassRepository.books(id).find(filter);
  }

  @post('/ed-classes/{id}/books', {
    responses: {
      '200': {
        description: 'EdClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EdClass.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInEdClass',
            exclude: ['_id'],
            optional: ['edClassId']
          }),
        },
      },
    }) book: Omit<Book, '_id'>,
  ): Promise<Book> {
    return this.edClassRepository.books(id).create(book);
  }

  @patch('/ed-classes/{id}/books', {
    responses: {
      '200': {
        description: 'EdClass.Book PATCH success count',
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
    return this.edClassRepository.books(id).patch(book, where);
  }

  @del('/ed-classes/{id}/books', {
    responses: {
      '200': {
        description: 'EdClass.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.edClassRepository.books(id).delete(where);
  }
}
