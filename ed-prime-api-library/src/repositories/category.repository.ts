import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {LibraryDataSource} from '../datasources';
import {Category, CategoryRelations, Book} from '../models';
import {BookRepository} from './book.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype._id,
  CategoryRelations
> {

  public readonly book: HasOneRepositoryFactory<Book, typeof Category.prototype._id>;

  constructor(
    @inject('datasources.Library') dataSource: LibraryDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(Category, dataSource);
    this.book = this.createHasOneRepositoryFactoryFor('book', bookRepositoryGetter);
    this.registerInclusionResolver('book', this.book.inclusionResolver);
  }
}
