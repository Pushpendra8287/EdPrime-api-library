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
import {Publisher} from '../models';
import {PublisherRepository} from '../repositories';

export class PublisherController {
  constructor(
    @repository(PublisherRepository)
    public publisherRepository : PublisherRepository,
  ) {}

  @post('/publishers')
  @response(200, {
    description: 'Publisher model instance',
    content: {'application/json': {schema: getModelSchemaRef(Publisher)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publisher, {
            title: 'NewPublisher',
            
          }),
        },
      },
    })
    publisher: Publisher,
  ): Promise<Publisher> {
    return this.publisherRepository.create(publisher);
  }

  @get('/publishers/count')
  @response(200, {
    description: 'Publisher model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Publisher) where?: Where<Publisher>,
  ): Promise<Count> {
    return this.publisherRepository.count(where);
  }

  @get('/publishers')
  @response(200, {
    description: 'Array of Publisher model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Publisher, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Publisher) filter?: Filter<Publisher>,
  ): Promise<Publisher[]> {
    return this.publisherRepository.find(filter);
  }

  @patch('/publishers')
  @response(200, {
    description: 'Publisher PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publisher, {partial: true}),
        },
      },
    })
    publisher: Publisher,
    @param.where(Publisher) where?: Where<Publisher>,
  ): Promise<Count> {
    return this.publisherRepository.updateAll(publisher, where);
  }

  @get('/publishers/{id}')
  @response(200, {
    description: 'Publisher model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Publisher, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Publisher, {exclude: 'where'}) filter?: FilterExcludingWhere<Publisher>
  ): Promise<Publisher> {
    return this.publisherRepository.findById(id, filter);
  }

  @patch('/publishers/{id}')
  @response(204, {
    description: 'Publisher PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publisher, {partial: true}),
        },
      },
    })
    publisher: Publisher,
  ): Promise<void> {
    await this.publisherRepository.updateById(id, publisher);
  }

  @put('/publishers/{id}')
  @response(204, {
    description: 'Publisher PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publisher: Publisher,
  ): Promise<void> {
    await this.publisherRepository.replaceById(id, publisher);
  }

  @del('/publishers/{id}')
  @response(204, {
    description: 'Publisher DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publisherRepository.deleteById(id);
  }
}
