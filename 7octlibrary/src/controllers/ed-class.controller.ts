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
import {EdClass} from '../models';
import {EdClassRepository} from '../repositories';

export class EdClassController {
  constructor(
    @repository(EdClassRepository)
    public edClassRepository : EdClassRepository,
  ) {}

  @post('/ed-classes')
  @response(200, {
    description: 'EdClass model instance',
    content: {'application/json': {schema: getModelSchemaRef(EdClass)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EdClass, {
            title: 'NewEdClass',
            
          }),
        },
      },
    })
    edClass: EdClass,
  ): Promise<EdClass> {
    return this.edClassRepository.create(edClass);
  }

  @get('/ed-classes/count')
  @response(200, {
    description: 'EdClass model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EdClass) where?: Where<EdClass>,
  ): Promise<Count> {
    return this.edClassRepository.count(where);
  }

  @get('/ed-classes')
  @response(200, {
    description: 'Array of EdClass model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EdClass, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EdClass) filter?: Filter<EdClass>,
  ): Promise<EdClass[]> {
    return this.edClassRepository.find(filter);
  }

  @patch('/ed-classes')
  @response(200, {
    description: 'EdClass PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EdClass, {partial: true}),
        },
      },
    })
    edClass: EdClass,
    @param.where(EdClass) where?: Where<EdClass>,
  ): Promise<Count> {
    return this.edClassRepository.updateAll(edClass, where);
  }

  @get('/ed-classes/{id}')
  @response(200, {
    description: 'EdClass model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EdClass, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EdClass, {exclude: 'where'}) filter?: FilterExcludingWhere<EdClass>
  ): Promise<EdClass> {
    return this.edClassRepository.findById(id, filter);
  }

  @patch('/ed-classes/{id}')
  @response(204, {
    description: 'EdClass PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EdClass, {partial: true}),
        },
      },
    })
    edClass: EdClass,
  ): Promise<void> {
    await this.edClassRepository.updateById(id, edClass);
  }

  @put('/ed-classes/{id}')
  @response(204, {
    description: 'EdClass PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() edClass: EdClass,
  ): Promise<void> {
    await this.edClassRepository.replaceById(id, edClass);
  }

  @del('/ed-classes/{id}')
  @response(204, {
    description: 'EdClass DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.edClassRepository.deleteById(id);
  }
}
