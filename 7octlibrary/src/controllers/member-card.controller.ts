import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {MemberCard} from '../models';
import {MemberCardRepository} from '../repositories/member-card.repository';

export class MemberCardController {
  constructor(
    @repository(MemberCardRepository)
    public memberCardRepository: MemberCardRepository,
  ) {}

  @post('/member-cards')
  @response(200, {
    description: 'MemberCard model instance',
    content: {'application/json': {schema: getModelSchemaRef(MemberCard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberCard, {
            title: 'NewMemberCard',
            exclude: ['_id'],
          }),
        },
      },
    })
    memberCard: Omit<MemberCard, 'id'>,
  ): Promise<MemberCard> {
    return this.memberCardRepository.create(memberCard);
  }

  @get('/member-cards/count')
  @response(200, {
    description: 'MemberCard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MemberCard) where?: Where<MemberCard>,
  ): Promise<Count> {
    return this.memberCardRepository.count(where);
  }

  @get('/member-cards')
  @response(200, {
    description: 'Array of MemberCard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MemberCard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MemberCard) filter?: Filter<MemberCard>,
  ): Promise<MemberCard[]> {
    return this.memberCardRepository.find(filter);
  }

  @patch('/member-cards')
  @response(200, {
    description: 'MemberCard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberCard, {partial: true}),
        },
      },
    })
    memberCard: MemberCard,
    @param.where(MemberCard) where?: Where<MemberCard>,
  ): Promise<Count> {
    return this.memberCardRepository.updateAll(memberCard, where);
  }

  @get('/member-cards/{id}')
  @response(200, {
    description: 'MemberCard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MemberCard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MemberCard, {exclude: 'where'})
    filter?: FilterExcludingWhere<MemberCard>,
  ): Promise<MemberCard> {
    return this.memberCardRepository.findById(id, filter);
  }

  @patch('/member-cards/{id}')
  @response(204, {
    description: 'MemberCard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberCard, {partial: true}),
        },
      },
    })
    memberCard: MemberCard,
  ): Promise<void> {
    await this.memberCardRepository.updateById(id, memberCard);
  }

  @put('/member-cards/{id}')
  @response(204, {
    description: 'MemberCard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() memberCard: MemberCard,
  ): Promise<void> {
    await this.memberCardRepository.replaceById(id, memberCard);
  }

  @del('/member-cards/{id}')
  @response(204, {
    description: 'MemberCard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.memberCardRepository.deleteById(id);
  }
}
