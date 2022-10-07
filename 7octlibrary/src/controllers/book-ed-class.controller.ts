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
  EdClass,
} from '../models';
import {BookRepository} from '../repositories';

export class BookEdClassController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/ed-class', {
    responses: {
      '200': {
        description: 'EdClass belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EdClass)},
          },
        },
      },
    },
  })
  async getEdClass(
    @param.path.string('id') id: typeof Book.prototype._id,
  ): Promise<EdClass> {
    return this.bookRepository.edClass(id);
  }
}
