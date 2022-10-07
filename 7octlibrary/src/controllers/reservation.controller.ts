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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Reservation} from '../models';
import {
  LibrarySettingsRepository,
  ReservationRepository,
} from '../repositories';

export class ReservationController {
  constructor(
    @repository(LibrarySettingsRepository)
    public librarySettingsRepository: LibrarySettingsRepository,
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) {}

  @post('/reservations')
  @response(200, {
    description: 'Reservation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservation',
          }),
        },
      },
    })
    reservation: Reservation,
  ): Promise<Reservation> {
    console.log(reservation, 'dgtdssa');
    let data = await this.librarySettingsRepository.findOne({
      fields: {e_bookreservation: true},
    });

    console.log(data?.e_bookreservation, 'dddddd');
    let data1 = data?.e_bookreservation;

    if (data1 !== true) {
      throw new HttpErrors.BadRequest('cannot create reservation');
    }
    return this.reservationRepository.create(reservation);
  }

  @get('/reservations/count')
  @response(200, {
    description: 'Reservation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reservation) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.count(where);
  }

  @get('/reservations')
  @response(200, {
    description: 'Array of Reservation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reservation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reservation) filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.reservationRepository.find({
      include: ['bookItems', 'member', 'book', 'bookLendings'],
    });
  }

  @patch('/reservations')
  @response(200, {
    description: 'Reservation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
    @param.where(Reservation) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.updateAll(reservation, where);
  }

  @get('/reservations/{id}')
  @response(200, {
    description: 'Reservation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reservation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reservation, {exclude: 'where'})
    filter?: FilterExcludingWhere<Reservation>,
  ): Promise<Reservation> {
    return this.reservationRepository.findById(id, filter);
  }

  @patch('/reservations/{id}')
  @response(204, {
    description: 'Reservation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.updateById(id, reservation);
  }

  @put('/reservations/{id}')
  @response(204, {
    description: 'Reservation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.replaceById(id, reservation);
  }

  @del('/reservations/{id}')
  @response(204, {
    description: 'Reservation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservationRepository.deleteById(id);
  }
}
