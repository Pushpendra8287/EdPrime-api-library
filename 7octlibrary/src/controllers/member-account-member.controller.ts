import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MemberAccount,
  Member,
} from '../models';
import {MemberAccountRepository} from '../repositories';

export class MemberAccountMemberController {
  constructor(
    @repository(MemberAccountRepository)
    public memberAccountRepository: MemberAccountRepository,
  ) { }

  @get('/member-accounts/{id}/member', {
    responses: {
      '200': {
        description: 'Member belonging to MemberAccount',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Member)},
          },
        },
      },
    },
  })
  async getMember(
    @param.path.string('id') id: typeof MemberAccount.prototype._id,
  ): Promise<Member> {
    return this.memberAccountRepository.member(id);
  }
}
