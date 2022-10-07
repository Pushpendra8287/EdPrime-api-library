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
import {StudentSetting} from '../models';
import {StudentSettingRepository} from '../repositories';

export class StudentSettingController {
  constructor(
    @repository(StudentSettingRepository)
    public studentSettingRepository : StudentSettingRepository,
  ) {}

  @post('/student-settings')
  @response(200, {
    description: 'StudentSetting model instance',
    content: {'application/json': {schema: getModelSchemaRef(StudentSetting)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudentSetting, {
            title: 'NewStudentSetting',
            exclude: ['_id'],
          }),
        },
      },
    })
    studentSetting: Omit<StudentSetting, '_id'>,
  ): Promise<StudentSetting> {
    let checkAllReadyExist = await this.studentSettingRepository.findOne()
    // if(){

    // }
    return this.studentSettingRepository.create(studentSetting);
  }

  @get('/student-settings/count')
  @response(200, {
    description: 'StudentSetting model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StudentSetting) where?: Where<StudentSetting>,
  ): Promise<Count> {
    return this.studentSettingRepository.count(where);
  }

  @get('/student-settings')
  @response(200, {
    description: 'Array of StudentSetting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StudentSetting, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StudentSetting) filter?: Filter<StudentSetting>,
  ): Promise<StudentSetting[]> {
    return this.studentSettingRepository.find(filter);
  }

  @patch('/student-settings')
  @response(200, {
    description: 'StudentSetting PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudentSetting, {partial: true}),
        },
      },
    })
    studentSetting: StudentSetting,
    @param.where(StudentSetting) where?: Where<StudentSetting>,
  ): Promise<Count> {
    return this.studentSettingRepository.updateAll(studentSetting, where);
  }

  @get('/student-settings/{id}')
  @response(200, {
    description: 'StudentSetting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StudentSetting, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(StudentSetting, {exclude: 'where'}) filter?: FilterExcludingWhere<StudentSetting>
  ): Promise<StudentSetting> {
    return this.studentSettingRepository.findById(id, filter);
  }

  @patch('/student-settings/{id}')
  @response(204, {
    description: 'StudentSetting PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudentSetting, {partial: true}),
        },
      },
    })
    studentSetting: StudentSetting,
  ): Promise<void> {
    await this.studentSettingRepository.updateById(id, studentSetting);
  }

  @put('/student-settings/{id}')
  @response(204, {
    description: 'StudentSetting PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() studentSetting: StudentSetting,
  ): Promise<void> {
    await this.studentSettingRepository.replaceById(id, studentSetting);
  }

  @del('/student-settings/{id}')
  @response(204, {
    description: 'StudentSetting DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studentSettingRepository.deleteById(id);
  }
}
