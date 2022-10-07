import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {LocationMaster} from '../models';
import {LocationMasterRepository} from '../repositories';

export class LocationMasterController {
  constructor(
    @repository(LocationMasterRepository)
    public locationMasterRepository: LocationMasterRepository,
  ) {}

  @post('/location-masters')
  @response(200, {
    description: 'LocationMaster model instance',
    content: {'application/json': {schema: getModelSchemaRef(LocationMaster)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LocationMaster, {
            title: 'NewLocationMaster',
            exclude: ['_id'],
          }),
        },
      },
    })
    locationMaster: Omit<LocationMaster, 'id'>,
  ): Promise<LocationMaster> {
    return this.locationMasterRepository.create(locationMaster);
  }

  @get('/location-masters/count')
  @response(200, {
    description: 'LocationMaster model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LocationMaster) where?: Where<LocationMaster>,
  ): Promise<Count> {
    return this.locationMasterRepository.count(where);
  }

  @get('/location-masters')
  @response(200, {
    description: 'Array of LocationMaster model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LocationMaster, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LocationMaster) filter?: Filter<LocationMaster>,
  ): Promise<LocationMaster[]> {
    return this.locationMasterRepository.find(filter);
  }

  @patch('/location-masters')
  @response(200, {
    description: 'LocationMaster PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LocationMaster, {partial: true}),
        },
      },
    })
    locationMaster: LocationMaster,
    @param.where(LocationMaster) where?: Where<LocationMaster>,
  ): Promise<Count> {
    return this.locationMasterRepository.updateAll(locationMaster, where);
  }

  @get('/location-masters/{id}')
  @response(200, {
    description: 'LocationMaster model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LocationMaster, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LocationMaster, {exclude: 'where'})
    filter?: FilterExcludingWhere<LocationMaster>,
  ): Promise<LocationMaster> {
    return this.locationMasterRepository.findById(id, filter);
  }

  @patch('/location-masters/{id}')
  @response(204, {
    description: 'LocationMaster PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LocationMaster, {partial: true}),
        },
      },
    })
    locationMaster: LocationMaster,
  ): Promise<void> {
    await this.locationMasterRepository.updateById(id, locationMaster);
  }

  @put('/location-masters/{id}')
  @response(204, {
    description: 'LocationMaster PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() locationMaster: LocationMaster,
  ): Promise<void> {
    await this.locationMasterRepository.replaceById(id, locationMaster);
  }

  @del('/location-masters/{id}')
  @response(204, {
    description: 'LocationMaster DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.locationMasterRepository.deleteById(id);
  }
}
