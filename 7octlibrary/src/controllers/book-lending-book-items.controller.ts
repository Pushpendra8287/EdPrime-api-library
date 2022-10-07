import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BookLending,
  BookItems,
} from '../models';
import {BookLendingRepository} from '../repositories';

export class BookLendingBookItemsController {
  constructor(
    @repository(BookLendingRepository)
    public bookLendingRepository: BookLendingRepository,
  ) { }

  @get('/book-lendings/{id}/book-items', {
    responses: {
      '200': {
        description: 'BookItems belonging to BookLending',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookItems)},
          },
        },
      },
    },
  })
  async getBookItems(
    @param.path.string('id') id: typeof BookLending.prototype._id,
  ): Promise<BookItems> {
    return this.bookLendingRepository.bookItems(id);
  }
}
