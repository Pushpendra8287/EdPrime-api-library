import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Book, EdClass, EdClassRelations} from '../models';
import {BookRepository} from './book.repository';

export class EdClassRepository extends DefaultCrudRepository<
  EdClass,
  typeof EdClass.prototype._id,
  EdClassRelations
> {

  public readonly books: HasManyRepositoryFactory<Book, typeof EdClass.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(EdClass, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.books = this.createHasManyRepositoryFactoryFor('books', bookRepositoryGetter,);
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}
