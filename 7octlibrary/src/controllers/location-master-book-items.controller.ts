import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  LocationMaster,
  BookItems,
} from '../models';
import {LocationMasterRepository} from '../repositories';

export class LocationMasterBookItemsController {
  constructor(
    @repository(LocationMasterRepository) protected locationMasterRepository: LocationMasterRepository,
  ) { }

  @get('/location-masters/{id}/book-items', {
    responses: {
      '200': {
        description: 'Array of LocationMaster has many BookItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BookItems)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BookItems>,
  ): Promise<BookItems[]> {
    return this.locationMasterRepository.bookItems(id).find(filter);
  }

  @post('/location-masters/{id}/book-items', {
    responses: {
      '200': {
        description: 'LocationMaster model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookItems)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LocationMaster.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {
            title: 'NewBookItemsInLocationMaster',
            exclude: ['_id'],
            optional: ['locationMasterId']
          }),
        },
      },
    }) bookItems: Omit<BookItems, 'id'>,
  ): Promise<BookItems> {
    return this.locationMasterRepository.bookItems(id).create(bookItems);
  }

  @patch('/location-masters/{id}/book-items', {
    responses: {
      '200': {
        description: 'LocationMaster.BookItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {partial: true}),
        },
      },
    })
    bookItems: Partial<BookItems>,
    @param.query.object('where', getWhereSchemaFor(BookItems)) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.locationMasterRepository.bookItems(id).patch(bookItems, where);
  }

  @del('/location-masters/{id}/book-items', {
    responses: {
      '200': {
        description: 'LocationMaster.BookItems DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BookItems)) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.locationMasterRepository.bookItems(id).delete(where);
  }
}
