import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {BookLending, Member, MemberAccount, MemberRelations, Reservation} from '../models';
import {BookLendingRepository} from './book-lending.repository';
import {MemberAccountRepository} from './member-account.repository';
import {ReservationRepository} from './reservation.repository';

export class MemberRepository extends DefaultCrudRepository<
  Member,
  typeof Member.prototype._id,
  MemberRelations
> {

  public readonly memberAccounts: HasManyRepositoryFactory<MemberAccount, typeof Member.prototype._id>;

  public readonly reservations: HasManyRepositoryFactory<Reservation, typeof Member.prototype._id>;

  public readonly bookLendings: HasManyRepositoryFactory<BookLending, typeof Member.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('MemberAccountRepository') protected memberAccountRepositoryGetter: Getter<MemberAccountRepository>, @repository.getter('ReservationRepository') protected reservationRepositoryGetter: Getter<ReservationRepository>, @repository.getter('BookLendingRepository') protected bookLendingRepositoryGetter: Getter<BookLendingRepository>,
  ) {
    super(Member, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.bookLendings = this.createHasManyRepositoryFactoryFor('bookLendings', bookLendingRepositoryGetter,);
    this.registerInclusionResolver('bookLendings', this.bookLendings.inclusionResolver);
    this.reservations = this.createHasManyRepositoryFactoryFor('reservations', reservationRepositoryGetter,);
    this.registerInclusionResolver('reservations', this.reservations.inclusionResolver);
    this.memberAccounts = this.createHasManyRepositoryFactoryFor('memberAccounts', memberAccountRepositoryGetter,);
    this.registerInclusionResolver('memberAccounts', this.memberAccounts.inclusionResolver);
  }
}
