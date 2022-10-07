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
  Member,
  Reservation,
} from '../models';
import {MemberRepository} from '../repositories';

export class MemberReservationController {
  constructor(
    @repository(MemberRepository) protected memberRepository: MemberRepository,
  ) { }

  @get('/members/{id}/reservations', {
    responses: {
      '200': {
        description: 'Array of Member has many Reservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reservation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.memberRepository.reservations(id).find(filter);
  }

  @post('/members/{id}/reservations', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Member.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservationInMember',
            exclude: ['_id'],
            optional: ['memberId']
          }),
        },
      },
    }) reservation: Omit<Reservation, '_id'>,
  ): Promise<Reservation> {
    return this.memberRepository.reservations(id).create(reservation);
  }

  @patch('/members/{id}/reservations', {
    responses: {
      '200': {
        description: 'Member.Reservation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Partial<Reservation>,
    @param.query.object('where', getWhereSchemaFor(Reservation)) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.memberRepository.reservations(id).patch(reservation, where);
  }

  @del('/members/{id}/reservations', {
    responses: {
      '200': {
        description: 'Member.Reservation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reservation)) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.memberRepository.reservations(id).delete(where);
  }
}
