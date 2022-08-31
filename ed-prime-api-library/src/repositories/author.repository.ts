import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LibraryDataSource} from '../datasources';
import {Author, AuthorRelations} from '../models';

export class AuthorRepository extends DefaultCrudRepository<
  Author,
  typeof Author.prototype.id,
  AuthorRelations
> {
  constructor(
    @inject('datasources.Library') dataSource: LibraryDataSource,
  ) {
    super(Author, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {

      ctx.data.modified = new Date();

    });
  }
}
