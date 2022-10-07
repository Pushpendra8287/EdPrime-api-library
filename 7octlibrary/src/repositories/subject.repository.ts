import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Book, Subject, SubjectRelations} from '../models';
import {BookRepository} from './book.repository';

export class SubjectRepository extends DefaultCrudRepository<
  Subject,
  typeof Subject.prototype._id,
  SubjectRelations
> {

  public readonly books: HasManyRepositoryFactory<Book, typeof Subject.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(Subject, dataSource);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.books = this.createHasManyRepositoryFactoryFor('books', bookRepositoryGetter,);
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}
