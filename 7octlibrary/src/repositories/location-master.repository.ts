import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {BookItems, LocationMaster, LocationMasterRelations} from '../models';
import {BookItemsRepository} from './book-items.repository';

export class LocationMasterRepository extends DefaultCrudRepository<
  LocationMaster,
  typeof LocationMaster.prototype._id,
  LocationMasterRelations
> {

  public readonly bookItems: HasManyRepositoryFactory<BookItems, typeof LocationMaster.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('BookItemsRepository') protected bookItemsRepositoryGetter: Getter<BookItemsRepository>,
  ) {
    super(LocationMaster, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.bookItems = this.createHasManyRepositoryFactoryFor('bookItems', bookItemsRepositoryGetter,);
    this.registerInclusionResolver('bookItems', this.bookItems.inclusionResolver);
  }
}
