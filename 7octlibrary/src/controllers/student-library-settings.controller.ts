import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  LibrarySettings, Student
} from '../models';
import {StudentRepository} from '../repositories';

export class StudentLibrarySettingsController {
  constructor(
    @repository(StudentRepository) protected studentRepository: StudentRepository,
  ) { }

  @get('/students/{id}/library-settings', {
    responses: {
      '200': {
        description: 'Array of Student has many LibrarySettings',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LibrarySettings)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LibrarySettings>,
  ): Promise<LibrarySettings[]> {
    return this.studentRepository.librarySettings(id).find(filter);
  }

  @post('/students/{id}/library-settings', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {'application/json': {schema: getModelSchemaRef(LibrarySettings)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Student.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibrarySettings, {
            title: 'NewLibrarySettingsInStudent',
            exclude: ['_id'],
            optional: ['admin_id']
          }),
        },
      },
    }) librarySettings: Omit<LibrarySettings, '_id'>,
  ): Promise<LibrarySettings> {
    return this.studentRepository.librarySettings(id).create(librarySettings);
  }

  @patch('/students/{id}/library-settings', {
    responses: {
      '200': {
        description: 'Student.LibrarySettings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibrarySettings, {partial: true}),
        },
      },
    })
    librarySettings: Partial<LibrarySettings>,
    @param.query.object('where', getWhereSchemaFor(LibrarySettings)) where?: Where<LibrarySettings>,
  ): Promise<Count> {
    return this.studentRepository.librarySettings(id).patch(librarySettings, where);
  }

  @del('/students/{id}/library-settings', {
    responses: {
      '200': {
        description: 'Student.LibrarySettings DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LibrarySettings)) where?: Where<LibrarySettings>,
  ): Promise<Count> {
    return this.studentRepository.librarySettings(id).delete(where);
  }
}
