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
  Genre,
} from '../models';
import {BookRepository} from '../repositories';

export class BookGenreController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/genre', {
    responses: {
      '200': {
        description: 'Genre belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Genre)},
          },
        },
      },
    },
  })
  async getGenre(
    @param.path.string('id') id: typeof Book.prototype._id,
  ): Promise<Genre> {
    return this.bookRepository.genre(id);
  }
}
