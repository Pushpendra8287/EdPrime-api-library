import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BookItems,
  LocationMaster,
} from '../models';
import {BookItemsRepository} from '../repositories';

export class BookItemsLocationMasterController {
  constructor(
    @repository(BookItemsRepository)
    public bookItemsRepository: BookItemsRepository,
  ) { }

  @get('/book-items/{id}/location-master', {
    responses: {
      '200': {
        description: 'LocationMaster belonging to BookItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LocationMaster)},
          },
        },
      },
    },
  })
  async getLocationMaster(
    @param.path.string('id') id: typeof BookItems.prototype._id,
  ): Promise<LocationMaster> {
    return this.bookItemsRepository.locationMaster(id);
  }
}
