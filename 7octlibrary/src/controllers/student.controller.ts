// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getJsonSchema, post, requestBody} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PermissionsKeys} from '../authorizations/permission_keys';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {Student} from '../models';
import {
  Credentials,
  StudentRepository,
} from '../repositories/student.repository';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {JWTService} from '../services/jwt.service';
import {MyUserService} from '../services/student.service';
import {validateCredentials} from '../services/validator';
import {CredentialsRequestBody} from './specs/students.controller.specs';
export class StudentController {
  savedUser: any;
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public studentService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtservice: JWTService,
  ) {}

  @post('/students/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchema(Student),
        },
      },
    },
  })
  async signup(@requestBody() studentData: Student) {
    validateCredentials(
      _.pick(studentData, ['email', 'password', 'contact_no']),
    );
    let email = await this.studentRepository.findOne({
      where: {
        email: studentData.email,
      },
    });
    let contact_no = await this.studentRepository.findOne({
      where: {
        contact_no: studentData.contact_no,
      },
    });
    if (!email && !contact_no) {
      // studentData.user_role = [PermissionsKeys.Student]; //student permission
      studentData.user_role = [PermissionsKeys.Teacher]; //teacher permission
      // studentData.user_role = [PermissionsKeys.Admin]; //admin permission

      // encrypt password

      studentData.password = await this.hasher.hashPassword(
        studentData.password,
      );
      this.savedUser = await this.studentRepository.create(studentData);
      delete this.savedUser.password;
      return this.savedUser;
    }
    throw new NotFound('this Email And Contact_no Allready exist');
  }

  @post('/students/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentails: Credentials,
  ): Promise<{token: string}> {
    //make sure student exist,password should be valid

    const student = await this.studentService.verifyCredentials(credentails);
    const studentProfile = this.studentService.convertToUserProfile(student);

    //generate a json web token
    const token = await this.jwtservice.generateToken(studentProfile);
    return Promise.resolve({token});
  }

  @get('/students/get')
  @authenticate('jwt')
  async get(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }
}

class NotFound extends Error {
  statusCode: number;
  msg: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.msg = 'Allready exist';
  }
}
