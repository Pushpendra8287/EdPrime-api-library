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
  Member,
} from '../models';
import {BookLendingRepository} from '../repositories';

export class BookLendingMemberController {
  constructor(
    @repository(BookLendingRepository)
    public bookLendingRepository: BookLendingRepository,
  ) { }

  @get('/book-lendings/{id}/member', {
    responses: {
      '200': {
        description: 'Member belonging to BookLending',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Member)},
          },
        },
      },
    },
  })
  async getMember(
    @param.path.string('id') id: typeof BookLending.prototype._id,
  ): Promise<Member> {
    return this.bookLendingRepository.member(id);
  }
}
