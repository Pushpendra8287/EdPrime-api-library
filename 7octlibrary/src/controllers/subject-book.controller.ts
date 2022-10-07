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
  Subject,
  Book,
} from '../models';
import {SubjectRepository} from '../repositories';

export class SubjectBookController {
  constructor(
    @repository(SubjectRepository) protected subjectRepository: SubjectRepository,
  ) { }

  @get('/subjects/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Subject has many Book',
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
    return this.subjectRepository.books(id).find(filter);
  }

  @post('/subjects/{id}/books', {
    responses: {
      '200': {
        description: 'Subject model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Subject.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInSubject',
            exclude: ['_id'],
            optional: ['subjectId']
          }),
        },
      },
    }) book: Omit<Book, '_id'>,
  ): Promise<Book> {
    return this.subjectRepository.books(id).create(book);
  }

  @patch('/subjects/{id}/books', {
    responses: {
      '200': {
        description: 'Subject.Book PATCH success count',
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
    return this.subjectRepository.books(id).patch(book, where);
  }

  @del('/subjects/{id}/books', {
    responses: {
      '200': {
        description: 'Subject.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.subjectRepository.books(id).delete(where);
  }
}
