import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {LibrarySettings, LibrarySettingsRelations} from '../models';

export class LibrarySettingsRepository extends DefaultCrudRepository<
  LibrarySettings,
  typeof LibrarySettings.prototype._id,
  LibrarySettingsRelations
> {
  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource,
  ) {
    super(LibrarySettings, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
  }
}
