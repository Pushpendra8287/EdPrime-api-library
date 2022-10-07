import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TeacherSetting} from '../models';
import {TeacherSettingRepository} from '../repositories';

export class TeacherSettingController {
  constructor(
    @repository(TeacherSettingRepository)
    public teacherSettingRepository : TeacherSettingRepository,
  ) {}

  @post('/teacher-settings')
  @response(200, {
    description: 'TeacherSetting model instance',
    content: {'application/json': {schema: getModelSchemaRef(TeacherSetting)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TeacherSetting, {
            title: 'NewTeacherSetting',
            exclude: ['_id'],
          }),
        },
      },
    })
    teacherSetting: Omit<TeacherSetting, '_id'>,
  ): Promise<TeacherSetting> {
    return this.teacherSettingRepository.create(teacherSetting);
  }

  @get('/teacher-settings/count')
  @response(200, {
    description: 'TeacherSetting model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TeacherSetting) where?: Where<TeacherSetting>,
  ): Promise<Count> {
    return this.teacherSettingRepository.count(where);
  }

  @get('/teacher-settings')
  @response(200, {
    description: 'Array of TeacherSetting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TeacherSetting, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TeacherSetting) filter?: Filter<TeacherSetting>,
  ): Promise<TeacherSetting[]> {
    return this.teacherSettingRepository.find(filter);
  }

  @patch('/teacher-settings')
  @response(200, {
    description: 'TeacherSetting PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TeacherSetting, {partial: true}),
        },
      },
    })
    teacherSetting: TeacherSetting,
    @param.where(TeacherSetting) where?: Where<TeacherSetting>,
  ): Promise<Count> {
    return this.teacherSettingRepository.updateAll(teacherSetting, where);
  }

  @get('/teacher-settings/{id}')
  @response(200, {
    description: 'TeacherSetting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TeacherSetting, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TeacherSetting, {exclude: 'where'}) filter?: FilterExcludingWhere<TeacherSetting>
  ): Promise<TeacherSetting> {
    return this.teacherSettingRepository.findById(id, filter);
  }

  @patch('/teacher-settings/{id}')
  @response(204, {
    description: 'TeacherSetting PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TeacherSetting, {partial: true}),
        },
      },
    })
    teacherSetting: TeacherSetting,
  ): Promise<void> {
    await this.teacherSettingRepository.updateById(id, teacherSetting);
  }

  @put('/teacher-settings/{id}')
  @response(204, {
    description: 'TeacherSetting PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() teacherSetting: TeacherSetting,
  ): Promise<void> {
    await this.teacherSettingRepository.replaceById(id, teacherSetting);
  }

  @del('/teacher-settings/{id}')
  @response(204, {
    description: 'TeacherSetting DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.teacherSettingRepository.deleteById(id);
  }
}
