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
  Reservation,
} from '../models';
import {BookItemsRepository} from '../repositories';

export class BookItemsReservationController {
  constructor(
    @repository(BookItemsRepository)
    public bookItemsRepository: BookItemsRepository,
  ) { }

  @get('/book-items/{id}/reservation', {
    responses: {
      '200': {
        description: 'Reservation belonging to BookItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reservation)},
          },
        },
      },
    },
  })
  async getReservation(
    @param.path.string('id') id: typeof BookItems.prototype._id,
  ): Promise<Reservation> {
    return this.bookItemsRepository.reservation(id);
  }
}
