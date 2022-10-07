import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LibraryDataSource} from '../datasources/library.datasource';
import {MemberCard, MemberCardRelations} from '../models';

export class MemberCardRepository extends DefaultCrudRepository<
  MemberCard,
  typeof MemberCard.prototype._id,
  MemberCardRelations
> {
  constructor(@inject('datasources.Library') dataSource: LibraryDataSource) {
    super(MemberCard, dataSource);
  }
}
