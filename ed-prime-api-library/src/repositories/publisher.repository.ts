import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {LibraryDataSource} from '../datasources';
import {Publisher, PublisherRelations, Book} from '../models';
import {BookRepository} from './book.repository';

export class PublisherRepository extends DefaultCrudRepository<
  Publisher,
  typeof Publisher.prototype.id,
  PublisherRelations
> {

  public readonly books: HasManyRepositoryFactory<Book, typeof Publisher.prototype.id>;

  constructor(
    @inject('datasources.Library') dataSource: LibraryDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(Publisher, dataSource);
    this.books = this.createHasManyRepositoryFactoryFor('books', bookRepositoryGetter,);
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}
