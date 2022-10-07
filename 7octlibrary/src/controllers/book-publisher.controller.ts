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
  Publisher,
} from '../models';
import {BookRepository} from '../repositories';

export class BookPublisherController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/publisher', {
    responses: {
      '200': {
        description: 'Publisher belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publisher)},
          },
        },
      },
    },
  })
  async getPublisher(
    @param.path.string('id') id: typeof Book.prototype._id,
  ): Promise<Publisher> {
    return this.bookRepository.publisher(id);
  }
}
