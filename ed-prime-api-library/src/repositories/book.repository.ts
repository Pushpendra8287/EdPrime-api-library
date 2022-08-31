import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LibraryDataSource} from '../datasources';
import {Book, BookRelations} from '../models';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
> {
  constructor(
    @inject('datasources.Library') dataSource: LibraryDataSource,
  ) {
    super(Book, dataSource);
  }
}
