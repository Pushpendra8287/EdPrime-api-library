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
  Member,
  BookLending,
} from '../models';
import {MemberRepository} from '../repositories';

export class MemberBookLendingController {
  constructor(
    @repository(MemberRepository) protected memberRepository: MemberRepository,
  ) { }

  @get('/members/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Array of Member has many BookLending',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookLending)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BookLending>,
  ): Promise<BookLending[]> {
    return this.memberRepository.bookLendings(id).find(filter);
  }

  @post('/members/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookLending)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Member.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {
            title: 'NewBookLendingInMember',
            exclude: ['_id'],
            optional: ['memberId']
          }),
        },
      },
    }) bookLending: Omit<BookLending, '_id'>,
  ): Promise<BookLending> {
    return this.memberRepository.bookLendings(id).create(bookLending);
  }

  @patch('/members/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Member.BookLending PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {partial: true}),
        },
      },
    })
    bookLending: Partial<BookLending>,
    @param.query.object('where', getWhereSchemaFor(BookLending)) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.memberRepository.bookLendings(id).patch(bookLending, where);
  }

  @del('/members/{id}/book-lendings', {
    responses: {
      '200': {
        description: 'Member.BookLending DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookLending)) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.memberRepository.bookLendings(id).delete(where);
  }
}
