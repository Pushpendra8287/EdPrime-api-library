import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {
  BookItems,
  BookLending,
  BookLendingRelations,
  Member,
  Reservation,
} from '../models';
import {BookItemsRepository} from './book-items.repository';
import {MemberRepository} from './member.repository';
import {ReservationRepository} from './reservation.repository';

export class BookLendingRepository extends DefaultCrudRepository<
  BookLending,
  typeof BookLending.prototype._id,
  BookLendingRelations
> {
  public readonly bookItems: BelongsToAccessor<
    BookItems,
    typeof BookLending.prototype._id
  >;

  public readonly member: BelongsToAccessor<
    Member,
    typeof BookLending.prototype._id
  >;

  public readonly reservation: BelongsToAccessor<
    Reservation,
    typeof BookLending.prototype._id
  >;
  BookLendingRepository: any;
  due_date: number;
  bookFines: any;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource,
    @repository.getter('BookItemsRepository')
    protected bookItemsRepositoryGetter: Getter<BookItemsRepository>,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('ReservationRepository')
    protected reservationRepositoryGetter: Getter<ReservationRepository>,
  ) {
    super(BookLending, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });

    this.reservation = this.createBelongsToAccessorFor(
      'reservation',
      reservationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'reservation',
      this.reservation.inclusionResolver,
    );
    this.member = this.createBelongsToAccessorFor(
      'member',
      memberRepositoryGetter,
    );
    this.registerInclusionResolver('member', this.member.inclusionResolver);
    this.bookItems = this.createBelongsToAccessorFor(
      'bookItems',
      bookItemsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'bookItems',
      this.bookItems.inclusionResolver,
    );
  }
}
