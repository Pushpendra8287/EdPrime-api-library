import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {BookLending} from '../models';
import {BookLendingRepository, StudentRepository, StudentSettingRepository, TeacherSettingRepository} from '../repositories';

export class BookLendingController {
  // due_date: any
  booklendingdata: any;
  return_date: Date;
  due_date: Date;
  bookLending: any;
  damage_charges: any;
  waived_amount: any;
  net_amount: number;
  fine_charge: number;
  received_by: string;
  userRole: any;
  numsAllowBookStudent: any;
  maxCheckOutBookStudent: any

  constructor(
    @repository(BookLendingRepository)
    public bookLendingRepository: BookLendingRepository,
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
    @repository(TeacherSettingRepository)
    public teacherSettingRepository: TeacherSettingRepository,
    @repository(StudentSettingRepository)
    public studentSettingRepository: StudentSettingRepository,
  ) { }

  @post('/book-lendings/{id}')
  @response(200, {
    description: 'BookLending model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookLending)}},
  })
  async create(
    // @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {
            title: 'NewBookLending',

          }),
        },
      },
    })
    bookLending: BookLending,
  ): Promise<BookLending> {
    // UserType check
    let data = await this.studentRepository.findById(bookLending.usertype);
    console.log(data.user_role)
    this.userRole = data.user_role
    // for Student
    if (this.userRole == "student") {
      // all ready issue book qty check
      let allReadyIssueBook = await this.bookLendingRepository.find({
        where: {
          and: [
            {
              usertype: bookLending.usertype,
              isSubmitted: false
            }
          ]
        }
      })
      // length count
      let allReadyIsuseQty = allReadyIssueBook.length
      console.log(allReadyIsuseQty,"Qty")
      let studentSetting = await this.studentSettingRepository.findOne()
      this.maxCheckOutBookStudent = studentSetting?.cb_max_checkout_type1;
      this.numsAllowBookStudent = studentSetting?.cb_max_borrow_allow_days1;
      if (this.maxCheckOutBookStudent > allReadyIsuseQty) {
        // let date1 = Math.round(( Date.now() + this.numsAllowBookStudent * 24 * 60 * 60 * 1000))
        bookLending.due_date = new Date( Date.now() + this.numsAllowBookStudent * 24 * 60 * 60 * 1000)
      }
      else{
        throw new HttpErrors.BadRequest("Allready max Book issues")
      }
    }
    //for teacher
    else if (this.userRole == "teacher") {
      let allReadyIssueBook = await this.bookLendingRepository.find({
        where: {
          and: [
            {
              usertype: bookLending.usertype,
              isSubmitted: false
            }
          ]
        }
      })
      let teacherMaxCheckoutBook = await this.teacherSettingRepository.findOne()
      let returnDateTeacher = teacherMaxCheckoutBook?.cb_max_borrow_allow_days1;
      let numAllowTeacher = teacherMaxCheckoutBook?.cb_max_borrow_allow_days1;


    }
    return this.bookLendingRepository.create(bookLending);
  }


  /////  book return details

  @get('/bookreturn-details/{id}')
  @response(200, {
    description: 'BookLending model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookLending, {
          title: 'ReturnbookDetails',
        }),
      },
    },
  })
  async detailsfindById(
    @param.path.string('id') id: string,
    @param.filter(BookLending, {exclude: 'where'}) filter?: FilterExcludingWhere<BookLending>
  ): Promise<BookLending> {
    let booklendingdata = await this.bookLendingRepository.findById(id);
    if (booklendingdata) {
      this.return_date = new Date();

      this.due_date = new Date(booklendingdata.due_date);

      let dayCount = Math.round((Number(this.return_date) - Number(this.due_date)) / (1000 * 60 * 60 * 24));
      this.fine_charge = dayCount * 10;
      this.damage_charges = 0;
      this.waived_amount = 0;

      this.net_amount = ((this.fine_charge + this.damage_charges) - this.waived_amount);

    }
    booklendingdata.fine_charge = this.fine_charge
    booklendingdata.net_amount = this.net_amount

    return booklendingdata;
  };

  ///////////////

  // this.damage_charges = this.bookLending?.damage_charges;
  // // console.log("98 " + this.damage_charges);

  // this.waived_amount = this.bookLending?.waived_amount;
  // // console.log("101 " + this.waived_amount);
  // console.log("fIN cGRG = " + this.fine_charge);

  // // this.net_amount = ((this.fine_charge + this.damage_charges) - this.waived_amount);
  // console.log("net_amount = " + this.net_amount);
  // this.bookLendingRepository.findById(id);
  ////////////////

  ////////////////////

  // book return

  @post('/book-lendings_return')
  @response(200, {
    description: 'BookLending model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookLending)}},
  })
  async returnBook(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {
            title: 'Return-book',

          }),
        },
      },
    })
    bookLending: BookLending,
  ): Promise<BookLending> {
    let booklendingdata = await this.bookLendingRepository.findById(bookLending._id);
    if (booklendingdata) {
      this.received_by = bookLending?.received_by
      this.return_date = new Date();


      let fine_charge = bookLending?.fine_charge;
      this.damage_charges = bookLending?.damage_charges;
      this.waived_amount = bookLending?.waived_amount;
      this.net_amount = ((fine_charge + this.damage_charges) - this.waived_amount);

      let data = {
        damage_charges: this.damage_charges,
        waived_amount: this.waived_amount,
        fine_charge: fine_charge,
        net_amount: this.net_amount,
        return_date: this.return_date,
        received_by: this.received_by
      };

      await this.bookLendingRepository.updateById(bookLending._id, data)
    }
    return await this.bookLendingRepository.findById(bookLending._id);

  };

  ///////




  @get('/book-lendings/count')
  @response(200, {
    description: 'BookLending model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BookLending) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.bookLendingRepository.count(where);
  }

  @get('/book-lendings')
  @response(200, {
    description: 'Array of BookLending model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BookLending, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BookLending) filter?: Filter<BookLending>,

  ): Promise<BookLending[]> {
    //
    return this.bookLendingRepository.find({include: ['reservation', 'member', 'bookItems',]});
  }

  @patch('/book-lendings')
  @response(200, {
    description: 'BookLending PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {partial: true}),
        },
      },
    })
    bookLending: BookLending,
    @param.where(BookLending) where?: Where<BookLending>,
  ): Promise<Count> {
    return this.bookLendingRepository.updateAll(bookLending, where);
  }

  @get('/book-lendings/{id}')
  @response(200, {
    description: 'BookLending model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookLending, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BookLending, {exclude: 'where'}) filter?: FilterExcludingWhere<BookLending>
  ): Promise<BookLending> {

    return this.bookLendingRepository.findById(id, filter);
  }

  @patch('/book-lendings/{id}')
  @response(204, {
    description: 'BookLending PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLending, {partial: true}),
        },
      },
    })
    bookLending: BookLending,
  ): Promise<void> {
    await this.bookLendingRepository.updateById(id, bookLending);
  }

  @put('/book-lendings/{id}')
  @response(204, {
    description: 'BookLending PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bookLending: BookLending,
  ): Promise<void> {
    await this.bookLendingRepository.replaceById(id, bookLending);
  }

  @del('/book-lendings/{id}')
  @response(204, {
    description: 'BookLending DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookLendingRepository.deleteById(id);
  }
}
class NotFound extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 400
  }
}
