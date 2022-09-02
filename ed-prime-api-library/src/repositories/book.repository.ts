import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, ReferencesManyAccessor} from '@loopback/repository';
import {LibraryDataSource} from '../datasources';
import {Book, BookRelations, Author} from '../models';
import {AuthorRepository} from './author.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype._id,
  BookRelations
> {

  public readonly Bookauthor: ReferencesManyAccessor<Author, typeof Book.prototype._id>;

  constructor(
    @inject('datasources.Library') dataSource: LibraryDataSource, @repository.getter('AuthorRepository') protected authorRepositoryGetter: Getter<AuthorRepository>,
  ) {
    super(Book, dataSource);
    this.Bookauthor = this.createReferencesManyAccessorFor('Bookauthor', authorRepositoryGetter,);
    this.registerInclusionResolver('Bookauthor', this.Bookauthor.inclusionResolver);
  }
}
