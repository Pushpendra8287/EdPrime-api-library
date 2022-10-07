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
import {BookItems} from '../models';
import {BookItemsRepository} from '../repositories';

export class BookItemController {
  constructor(
    @repository(BookItemsRepository)
    public bookItemsRepository : BookItemsRepository,
  ) {}

  @post('/book-items')
  @response(200, {
    description: 'BookItems model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookItems)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {
            title: 'NewBookItems',

          }),
        },
      },
    })
    bookItems: BookItems,
  ): Promise<BookItems> {
    return this.bookItemsRepository.create(bookItems);
  }

  @get('/book-items/count')
  @response(200, {
    description: 'BookItems model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BookItems) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.bookItemsRepository.count(where);
  }

  @get('/book-items')
  @response(200, {
    description: 'Array of BookItems model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BookItems, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BookItems) filter?: Filter<BookItems>,
  ): Promise<BookItems[]> {
    return this.bookItemsRepository.find({include:['reservation',"locationMaster","book", "bookLendings"]});
  }

  @patch('/book-items')
  @response(200, {
    description: 'BookItems PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {partial: true}),
        },
      },
    })
    bookItems: BookItems,
    @param.where(BookItems) where?: Where<BookItems>,
  ): Promise<Count> {
    return this.bookItemsRepository.updateAll(bookItems, where);
  }

  @get('/book-items/{id}')
  @response(200, {
    description: 'BookItems model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookItems, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BookItems, {exclude: 'where'}) filter?: FilterExcludingWhere<BookItems>
  ): Promise<BookItems> {
    return this.bookItemsRepository.findById(id, filter);
  }

  @patch('/book-items/{id}')
  @response(204, {
    description: 'BookItems PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookItems, {partial: true}),
        },
      },
    })
    bookItems: BookItems,
  ): Promise<void> {
    await this.bookItemsRepository.updateById(id, bookItems);
  }

  @put('/book-items/{id}')
  @response(204, {
    description: 'BookItems PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bookItems: BookItems,
  ): Promise<void> {
    await this.bookItemsRepository.replaceById(id, bookItems);
  }

  @del('/book-items/{id}')
  @response(204, {
    description: 'BookItems DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookItemsRepository.deleteById(id);
  }
}
