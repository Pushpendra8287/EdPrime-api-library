import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Member, MemberAccount, MemberAccountRelations} from '../models';
import {MemberRepository} from './member.repository';

export class MemberAccountRepository extends DefaultCrudRepository<
  MemberAccount,
  typeof MemberAccount.prototype._id,
  MemberAccountRelations
> {

  public readonly member: BelongsToAccessor<Member, typeof MemberAccount.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('MemberRepository') protected memberRepositoryGetter: Getter<MemberRepository>,
  ) {
    super(MemberAccount, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.member = this.createBelongsToAccessorFor('member', memberRepositoryGetter,);
    this.registerInclusionResolver('member', this.member.inclusionResolver);
  }
}
