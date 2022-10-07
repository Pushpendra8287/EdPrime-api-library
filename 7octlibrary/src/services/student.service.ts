import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {Student} from '../models';
import {Credentials, StudentRepository} from '../repositories/student.repository';
import {BcryptHasher} from './hash.password.bcrypt';

export class MyUserService implements UserService<Student, Credentials>{

  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<Student> {
    //
    const student = await this.studentRepository.findOne({
      where: {
        email: credentials.email
      },
    });
    if (!student) {
      throw new HttpErrors.NotFound(
        `user not found with this ${credentials.email}`
      );
    }
    const passwordMatched = await this.hasher.comparePassword(
      credentials.password,
      student.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(' Password Not Valid ');
    }
    return student;

  };


  convertToUserProfile(
    student: Student,
  ): UserProfile {
    let studentName = ''
    if (student.name) {
      studentName = student.name;
    }
    return {
      _id: `${student._id}`, name: `${studentName}`
    }
  }
}
