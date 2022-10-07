import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Book, BookItems, BookLending, Member, Reservation, ReservationRelations} from '../models';
import {BookItemsRepository} from './book-items.repository';
import {BookLendingRepository} from './book-lending.repository';
import {BookRepository} from './book.repository';
import {MemberRepository} from './member.repository';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype._id,
  ReservationRelations
> {

  public readonly bookItems: HasManyRepositoryFactory<BookItems, typeof Reservation.prototype._id>;


  public readonly member: BelongsToAccessor<Member, typeof Reservation.prototype._id>;

  public readonly bookLendings: HasManyRepositoryFactory<BookLending, typeof Reservation.prototype._id>;
  public readonly book: BelongsToAccessor<Book, typeof Reservation.prototype._id>;


  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('BookItemsRepository') protected bookItemsRepositoryGetter: Getter<BookItemsRepository>, @repository.getter('MemberRepository') protected memberRepositoryGetter: Getter<MemberRepository>, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>, @repository.getter('BookLendingRepository') protected bookLendingRepositoryGetter: Getter<BookLendingRepository>,
  ) {
    super(Reservation, dataSource);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.bookLendings = this.createHasManyRepositoryFactoryFor('bookLendings', bookLendingRepositoryGetter,);
    this.registerInclusionResolver('bookLendings', this.bookLendings.inclusionResolver);
    this.member = this.createBelongsToAccessorFor('member', memberRepositoryGetter,);
    this.registerInclusionResolver('member', this.member.inclusionResolver);
    this.book = this.createBelongsToAccessorFor('book', bookRepositoryGetter,);
    this.registerInclusionResolver('book', this.book.inclusionResolver);


    this.bookItems = this.createHasManyRepositoryFactoryFor('bookItems', bookItemsRepositoryGetter,);
    this.registerInclusionResolver('bookItems', this.bookItems.inclusionResolver);
  }
}
