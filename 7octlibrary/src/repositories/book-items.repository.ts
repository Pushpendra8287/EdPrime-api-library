import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Book, BookItems, BookItemsRelations, BookLending, LocationMaster, Reservation} from '../models';
import {BookLendingRepository} from './book-lending.repository';
import {BookRepository} from './book.repository';
import {LocationMasterRepository} from './location-master.repository';
import {ReservationRepository} from './reservation.repository';

export class BookItemsRepository extends DefaultCrudRepository<
  BookItems,
  typeof BookItems.prototype._id,
  BookItemsRelations
> {

  public readonly book: BelongsToAccessor<Book, typeof BookItems.prototype._id>;

  public readonly locationMaster: BelongsToAccessor<LocationMaster, typeof BookItems.prototype._id>;

  public readonly reservation: BelongsToAccessor<Reservation, typeof BookItems.prototype._id>;

  public readonly bookLendings: HasManyRepositoryFactory<BookLending, typeof BookItems.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>, @repository.getter('LocationMasterRepository') protected locationMasterRepositoryGetter: Getter<LocationMasterRepository>, @repository.getter('ReservationRepository') protected reservationRepositoryGetter: Getter<ReservationRepository>, @repository.getter('BookLendingRepository') protected bookLendingRepositoryGetter: Getter<BookLendingRepository>,
  ) {
    super(BookItems, dataSource);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.bookLendings = this.createHasManyRepositoryFactoryFor('bookLendings', bookLendingRepositoryGetter,);
    this.registerInclusionResolver('bookLendings', this.bookLendings.inclusionResolver);
    this.reservation = this.createBelongsToAccessorFor('reservation', reservationRepositoryGetter,);
    this.registerInclusionResolver('reservation', this.reservation.inclusionResolver);
    this.locationMaster = this.createBelongsToAccessorFor('locationMaster', locationMasterRepositoryGetter,);
    this.registerInclusionResolver('locationMaster', this.locationMaster.inclusionResolver);
    this.book = this.createBelongsToAccessorFor('book', bookRepositoryGetter,);
    this.registerInclusionResolver('book', this.book.inclusionResolver);
  }
}

