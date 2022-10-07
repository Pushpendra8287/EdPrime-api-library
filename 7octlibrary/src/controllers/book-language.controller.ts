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
  Language,
} from '../models';
import {BookRepository} from '../repositories';

export class BookLanguageController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/language', {
    responses: {
      '200': {
        description: 'Language belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Language)},
          },
        },
      },
    },
  })
  async getLanguage(
    @param.path.string('id') id: typeof Book.prototype._id,
  ): Promise<Language> {
    return this.bookRepository.language(id);
  }
}
