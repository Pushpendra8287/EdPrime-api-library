import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {BookFine, BookFineRelations} from '../models';

export class BookFineRepository extends DefaultCrudRepository<
  BookFine,
  typeof BookFine.prototype._id,
  BookFineRelations
> {
  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource,
  ) {
    super(BookFine, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
  }
}
