import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {StudentSetting, StudentSettingRelations} from '../models';

export class StudentSettingRepository extends DefaultCrudRepository<
  StudentSetting,
  typeof StudentSetting.prototype._id,
  StudentSettingRelations
> {
  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource,
  ) {
    super(StudentSetting, dataSource);
  }
}
