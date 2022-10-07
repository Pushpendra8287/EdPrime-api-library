import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BookItems,
  Book,
} from '../models';
import {BookItemsRepository} from '../repositories';

export class BookItemsBookController {
  constructor(
    @repository(BookItemsRepository)
    public bookItemsRepository: BookItemsRepository,
  ) { }

  @get('/book-items/{id}/book', {
    responses: {
      '200': {
        description: 'Book belonging to BookItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Book)},
          },
        },
      },
    },
  })
  async getBook(
    @param.path.string('id') id: typeof BookItems.prototype._id,
  ): Promise<Book> {
    return this.bookItemsRepository.book(id);
  }
}
