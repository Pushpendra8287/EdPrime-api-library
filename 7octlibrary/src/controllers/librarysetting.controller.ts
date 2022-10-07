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
import {LibrarySettings} from '../models';
import {LibrarySettingsRepository} from '../repositories';
import {PayloadRequestBody} from './specs/libraryupdate.specs';

export class LibrarysettingController {
  type: string;
  librarySettings: any;

  e_bookreservation: boolean | undefined;
  e_book_scrapping: boolean | undefined;
  e_fineDealydeposite: boolean | undefined;
  e_renew_fun: boolean | undefined;
  e_book_health_assesment: boolean | undefined;
  e_bar_qrcode: boolean | undefined;
  renewal_allowed_duedate: boolean | undefined;
  fine_charges_renewal: boolean | undefined;
  fine_charges_allowed: boolean | undefined;
  e_bookhealth_charges_return: boolean | undefined;
  e_book_shift_deposition: boolean | undefined;
  newobj: any;
  constructor(
    @repository(LibrarySettingsRepository)
    public librarySettingsRepository: LibrarySettingsRepository,
  ) {}

  @post('/library-settings')
  @response(200, {
    description: 'LibrarySettings model instance',
    content: {'application/json': {schema: getModelSchemaRef(LibrarySettings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibrarySettings, {
            title: 'NewLibrarySettings',
          }),
        },
      },
    })
    librarySettings: LibrarySettings,
  ): Promise<LibrarySettings> {
    return this.librarySettingsRepository.create(librarySettings);
  }

  //////////// update settings

  @post('/library-settings_update', {
    responses: {
      '200': {
        description: 'Update Sucessfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })
  async updatesetting(
    @requestBody(PayloadRequestBody) librarySettings: LibrarySettings,
  ): Promise<LibrarySettings> {
    2;
    console.log(librarySettings._id);

    let librarydata = await this.librarySettingsRepository.findOne({
      where: {
        admin_id: librarySettings._id,
      },
    });
    if (librarydata) {
      this.newobj = {};
      (
        Object.keys(librarySettings) as (keyof typeof librarySettings)[]
      ).forEach((key, index) => {
        if (
          key == 'e_fineDealydeposite' ||
          key == 'e_bookreservation' ||
          key == 'e_book_scrapping' ||
          key == 'e_renew_fun' ||
          key == 'e_book_health_assesment' ||
          key == 'e_bar_qrcode'
          // ||key == "max_books_checkout" ||
          // key == "max_days_borrow" ||
          // key == "send_reminder_borrow" ||
          // key == "send_reminder_overdue" ||
          // key == "max_res_memeber" ||
          // key == "max_threshold_booking" ||
          // key == "send_rem_reservation" ||
          // key == "renewal_allowed_issuance" ||
          // key == "renewal_allowed_duedate" ||
          // key == "fine_charges_renewal" ||
          // key == "per_day_charges" ||
          // key == "max_fine_charges" ||
          // key == "fine_charges_allowed" ||
          // key == "max_waiver_allowed" ||
          // key == "e_bookhealth_charges_return" ||
          // key == "e_book_shift_deposition" ||
          // key == "d_membership_plan" ||
          // key == "e_access_memebers" ||
          // key == "generate_bar_qrcode_books" ||
          // key == "generate_bar_qrcode_members"
        ) {
          console.log('124=' + librarySettings[key]);
          if (
            librarySettings[key] != undefined &&
            librarySettings[key] != null
            //  &&
            // librarySettings[key] != ''
          ) {
            this.newobj[key] = librarySettings[key];
          }
        }
        console.log(key, librarySettings[key], index);
      });

      console.log('134' + JSON.stringify(this.newobj));

      await this.librarySettingsRepository.updateById(
        librarydata._id,
        this.newobj,
      );
    }
    return this.newobj;
  }

  /////////////
  @get('/library-settings/count')
  @response(200, {
    description: 'LibrarySettings model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LibrarySettings) where?: Where<LibrarySettings>,
  ): Promise<Count> {
    return this.librarySettingsRepository.count(where);
  }

  @get('/library-settings')
  @response(200, {
    description: 'Array of LibrarySettings model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LibrarySettings, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LibrarySettings) filter?: Filter<LibrarySettings>,
  ): Promise<LibrarySettings[]> {
    return this.librarySettingsRepository.find(filter);
  }

  @patch('/library-settings')
  @response(200, {
    description: 'LibrarySettings PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibrarySettings, {partial: true}),
        },
      },
    })
    librarySettings: LibrarySettings,
    @param.where(LibrarySettings) where?: Where<LibrarySettings>,
  ): Promise<Count> {
    return this.librarySettingsRepository.updateAll(librarySettings, where);
  }

  @get('/library-settings/{id}')
  @response(200, {
    description: 'LibrarySettings model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LibrarySettings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LibrarySettings, {exclude: 'where'})
    filter?: FilterExcludingWhere<LibrarySettings>,
  ): Promise<LibrarySettings> {
    return this.librarySettingsRepository.findById(id, filter);
  }

  @patch('/library-settings/{id}')
  @response(204, {
    description: 'LibrarySettings PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibrarySettings, {partial: true}),
        },
      },
    })
    librarySettings: LibrarySettings,
  ): Promise<void> {
    await this.librarySettingsRepository.updateById(id, librarySettings);
  }

  @put('/library-settings/{id}')
  @response(204, {
    description: 'LibrarySettings PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() librarySettings: LibrarySettings,
  ): Promise<void> {
    await this.librarySettingsRepository.replaceById(id, librarySettings);
  }

  @del('/library-settings/{id}')
  @response(204, {
    description: 'LibrarySettings DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.librarySettingsRepository.deleteById(id);
  }
}
