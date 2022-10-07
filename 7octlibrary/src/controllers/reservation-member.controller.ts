import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reservation,
  Member,
} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationMemberController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) { }

  @get('/reservations/{id}/member', {
    responses: {
      '200': {
        description: 'Member belonging to Reservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Member)},
          },
        },
      },
    },
  })
  async getMember(
    @param.path.string('id') id: typeof Reservation.prototype._id,
  ): Promise<Member> {
    return this.reservationRepository.member(id);
  }
}
