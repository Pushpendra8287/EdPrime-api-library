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
  BookCategory,
} from '../models';
import {BookRepository} from '../repositories';

export class BookBookCategoryController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/book-category', {
    responses: {
      '200': {
        description: 'BookCategory belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookCategory)},
          },
        },
      },
    },
  })
  async getBookCategory(
    @param.path.string('id') id: typeof Book.prototype._id,
  ): Promise<BookCategory> {
    return this.bookRepository.bookCategory(id);
  }
}
