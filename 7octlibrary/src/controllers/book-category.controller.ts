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
import {BookCategory} from '../models';
import {BookCategoryRepository} from '../repositories';

export class BookCategoryController {
  constructor(
    @repository(BookCategoryRepository)
    public bookCategoryRepository : BookCategoryRepository,
  ) {}

  @post('/book-categories')
  @response(200, {
    description: 'BookCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookCategory, {
            title: 'NewBookCategory',
            
          }),
        },
      },
    })
    bookCategory: BookCategory,
  ): Promise<BookCategory> {
    return this.bookCategoryRepository.create(bookCategory);
  }

  @get('/book-categories/count')
  @response(200, {
    description: 'BookCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BookCategory) where?: Where<BookCategory>,
  ): Promise<Count> {
    return this.bookCategoryRepository.count(where);
  }

  @get('/book-categories')
  @response(200, {
    description: 'Array of BookCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BookCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BookCategory) filter?: Filter<BookCategory>,
  ): Promise<BookCategory[]> {
    return this.bookCategoryRepository.find(filter);
  }

  @patch('/book-categories')
  @response(200, {
    description: 'BookCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookCategory, {partial: true}),
        },
      },
    })
    bookCategory: BookCategory,
    @param.where(BookCategory) where?: Where<BookCategory>,
  ): Promise<Count> {
    return this.bookCategoryRepository.updateAll(bookCategory, where);
  }

  @get('/book-categories/{id}')
  @response(200, {
    description: 'BookCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BookCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<BookCategory>
  ): Promise<BookCategory> {
    return this.bookCategoryRepository.findById(id, filter);
  }

  @patch('/book-categories/{id}')
  @response(204, {
    description: 'BookCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookCategory, {partial: true}),
        },
      },
    })
    bookCategory: BookCategory,
  ): Promise<void> {
    await this.bookCategoryRepository.updateById(id, bookCategory);
  }

  @put('/book-categories/{id}')
  @response(204, {
    description: 'BookCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bookCategory: BookCategory,
  ): Promise<void> {
    await this.bookCategoryRepository.replaceById(id, bookCategory);
  }

  @del('/book-categories/{id}')
  @response(204, {
    description: 'BookCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookCategoryRepository.deleteById(id);
  }
}
