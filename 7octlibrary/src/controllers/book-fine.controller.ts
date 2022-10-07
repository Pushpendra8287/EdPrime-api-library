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
import {BookFine} from '../models';
import {BookFineRepository} from '../repositories';

export class BookFineController {
  constructor(
    @repository(BookFineRepository)
    public bookFineRepository: BookFineRepository,
  ) {}

  @post('/book-fines')
  @response(200, {
    description: 'BookFine model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookFine)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookFine, {
            title: 'NewBookFine',
            exclude: ['_id'],
          }),
        },
      },
    })
    bookFine: Omit<BookFine, 'id'>,
  ): Promise<BookFine> {
    return this.bookFineRepository.create(bookFine);
  }

  @get('/book-fines/count')
  @response(200, {
    description: 'BookFine model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(BookFine) where?: Where<BookFine>): Promise<Count> {
    return this.bookFineRepository.count(where);
  }

  @get('/book-fines')
  @response(200, {
    description: 'Array of BookFine model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BookFine, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BookFine) filter?: Filter<BookFine>,
  ): Promise<BookFine[]> {
    return this.bookFineRepository.find(filter);
  }

  @patch('/book-fines')
  @response(200, {
    description: 'BookFine PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookFine, {partial: true}),
        },
      },
    })
    bookFine: BookFine,
    @param.where(BookFine) where?: Where<BookFine>,
  ): Promise<Count> {
    return this.bookFineRepository.updateAll(bookFine, where);
  }

  @get('/book-fines/{id}')
  @response(200, {
    description: 'BookFine model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookFine, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BookFine, {exclude: 'where'})
    filter?: FilterExcludingWhere<BookFine>,
  ): Promise<BookFine> {
    return this.bookFineRepository.findById(id, filter);
  }

  @patch('/book-fines/{id}')
  @response(204, {
    description: 'BookFine PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookFine, {partial: true}),
        },
      },
    })
    bookFine: BookFine,
  ): Promise<void> {
    await this.bookFineRepository.updateById(id, bookFine);
  }

  @put('/book-fines/{id}')
  @response(204, {
    description: 'BookFine PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bookFine: BookFine,
  ): Promise<void> {
    await this.bookFineRepository.replaceById(id, bookFine);
  }

  @del('/book-fines/{id}')
  @response(204, {
    description: 'BookFine DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookFineRepository.deleteById(id);
  }
}
