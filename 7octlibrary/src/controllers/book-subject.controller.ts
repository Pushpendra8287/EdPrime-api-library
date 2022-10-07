import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Book,
  Subject,
} from '../models';
import {BookRepository} from '../repositories';

export class BookSubjectController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/subject', {
    responses: {
      '200': {
        description: 'Subject belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Subject)},
          },
        },
      },
    },
  })
  async getSubject(
    @param.path.string('id') id: typeof Book.prototype._id,
  ): Promise<Subject> {
    return this.bookRepository.subject(id);
  }
}
