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
  MemberAccount,
} from '../models';
import {MemberRepository} from '../repositories';

export class MemberMemberAccountController {
  constructor(
    @repository(MemberRepository) protected memberRepository: MemberRepository,
  ) { }

  @get('/members/{id}/member-accounts', {
    responses: {
      '200': {
        description: 'Array of Member has many MemberAccount',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MemberAccount)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MemberAccount>,
  ): Promise<MemberAccount[]> {
    return this.memberRepository.memberAccounts(id).find(filter);
  }

  @post('/members/{id}/member-accounts', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: {'application/json': {schema: getModelSchemaRef(MemberAccount)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Member.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberAccount, {
            title: 'NewMemberAccountInMember',
            exclude: ['_id'],
            optional: ['memberId']
          }),
        },
      },
    }) memberAccount: Omit<MemberAccount, '_id'>,
  ): Promise<MemberAccount> {
    return this.memberRepository.memberAccounts(id).create(memberAccount);
  }

  @patch('/members/{id}/member-accounts', {
    responses: {
      '200': {
        description: 'Member.MemberAccount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberAccount, {partial: true}),
        },
      },
    })
    memberAccount: Partial<MemberAccount>,
    @param.query.object('where', getWhereSchemaFor(MemberAccount)) where?: Where<MemberAccount>,
  ): Promise<Count> {
    return this.memberRepository.memberAccounts(id).patch(memberAccount, where);
  }

  @del('/members/{id}/member-accounts', {
    responses: {
      '200': {
        description: 'Member.MemberAccount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MemberAccount)) where?: Where<MemberAccount>,
  ): Promise<Count> {
    return this.memberRepository.memberAccounts(id).delete(where);
  }
}
