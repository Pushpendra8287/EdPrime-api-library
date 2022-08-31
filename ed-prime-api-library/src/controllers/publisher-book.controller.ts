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
  Publisher,
  Book,
} from '../models';
import {PublisherRepository} from '../repositories';

export class PublisherBookController {
  constructor(
    @repository(PublisherRepository) protected publisherRepository: PublisherRepository,
  ) { }

  @get('/publishers/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Publisher has many Book',
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
    return this.publisherRepository.books(id).find(filter);
  }

  @post('/publishers/{id}/books', {
    responses: {
      '200': {
        description: 'Publisher model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publisher.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInPublisher',
            exclude: ['id'],
            optional: ['publisher_id']
          }),
        },
      },
    }) book: Omit<Book, 'id'>,
  ): Promise<Book> {
    return this.publisherRepository.books(id).create(book);
  }

  @patch('/publishers/{id}/books', {
    responses: {
      '200': {
        description: 'Publisher.Book PATCH success count',
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
    return this.publisherRepository.books(id).patch(book, where);
  }

  @del('/publishers/{id}/books', {
    responses: {
      '200': {
        description: 'Publisher.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.publisherRepository.books(id).delete(where);
  }
}
