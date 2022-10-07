import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MemberAccount} from '../models';
import {MemberAccountRepository} from '../repositories';

export class MemberAccountController {
  constructor(
    @repository(MemberAccountRepository)
    public memberAccountRepository : MemberAccountRepository,
  ) {}

  @post('/member-accounts')
  @response(200, {
    description: 'MemberAccount model instance',
    content: {'application/json': {schema: getModelSchemaRef(MemberAccount)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberAccount, {
            title: 'NewMemberAccount',

          }),
        },
      },
    })
    memberAccount: MemberAccount,
  ): Promise<MemberAccount> {
    return this.memberAccountRepository.create(memberAccount);
  }

  @get('/member-accounts/count')
  @response(200, {
    description: 'MemberAccount model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MemberAccount) where?: Where<MemberAccount>,
  ): Promise<Count> {
    return this.memberAccountRepository.count(where);
  }

  @get('/member-accounts')
  @response(200, {
    description: 'Array of MemberAccount model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MemberAccount, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MemberAccount) filter?: Filter<MemberAccount>,
  ): Promise<MemberAccount[]> {
    return this.memberAccountRepository.find({include:['member']});
  }

  @patch('/member-accounts')
  @response(200, {
    description: 'MemberAccount PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberAccount, {partial: true}),
        },
      },
    })
    memberAccount: MemberAccount,
    @param.where(MemberAccount) where?: Where<MemberAccount>,
  ): Promise<Count> {
    return this.memberAccountRepository.updateAll(memberAccount, where);
  }

  @get('/member-accounts/{id}')
  @response(200, {
    description: 'MemberAccount model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MemberAccount, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MemberAccount, {exclude: 'where'}) filter?: FilterExcludingWhere<MemberAccount>
  ): Promise<MemberAccount> {
    return this.memberAccountRepository.findById(id, filter);
  }

  @patch('/member-accounts/{id}')
  @response(204, {
    description: 'MemberAccount PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberAccount, {partial: true}),
        },
      },
    })
    memberAccount: MemberAccount,
  ): Promise<void> {
    await this.memberAccountRepository.updateById(id, memberAccount);
  }

  @put('/member-accounts/{id}')
  @response(204, {
    description: 'MemberAccount PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() memberAccount: MemberAccount,
  ): Promise<void> {
    await this.memberAccountRepository.replaceById(id, memberAccount);
  }

  @del('/member-accounts/{id}')
  @response(204, {
    description: 'MemberAccount DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.memberAccountRepository.deleteById(id);
  }
}
