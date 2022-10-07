import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {TeacherSetting, TeacherSettingRelations} from '../models';

export class TeacherSettingRepository extends DefaultCrudRepository<
  TeacherSetting,
  typeof TeacherSetting.prototype._id,
  TeacherSettingRelations
> {
  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource,
  ) {
    super(TeacherSetting, dataSource);
  }
}
