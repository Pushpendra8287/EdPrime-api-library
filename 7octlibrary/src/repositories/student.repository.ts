import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Student, StudentRelations, LibrarySettings} from '../models';
import {LibrarySettingsRepository} from './library-settings.repository';

export type Credentials = {
  email: string,
  password: string;
  contact_no: string;
};

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype._id,
  StudentRelations
> {
  static contact_no: string;

  public readonly librarySettings: HasManyRepositoryFactory<LibrarySettings, typeof Student.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('LibrarySettingsRepository') protected librarySettingsRepositoryGetter: Getter<LibrarySettingsRepository>,
  ) {
    super(Student, dataSource);
    this.librarySettings = this.createHasManyRepositoryFactoryFor('librarySettings', librarySettingsRepositoryGetter,);
    this.registerInclusionResolver('librarySettings', this.librarySettings.inclusionResolver);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
  }
}
