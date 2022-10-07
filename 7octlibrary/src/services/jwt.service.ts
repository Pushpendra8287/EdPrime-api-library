import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService {
  @inject(TokenServiceBindings.TOKEN_SECRET)
  public readonly jwtSecret: string;
  @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
  public readonly jwtExpiresIn: String;
  async generateToken(studentProfile: UserProfile): Promise<string> {
    if (!studentProfile) {
      throw new HttpErrors.Unauthorized(
        'Error While Generating Token: Userprofile is Null',
      );
    }
    let token = '';
    try {
      token = await signAsync(studentProfile, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
      });
    } catch (err) {
      throw new HttpErrors.Unauthorized(`Error Generating token ${err}`);
    }
    return token;
  }

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(`Error verifying token:'token is null`);
    }
    let userprofile: UserProfile;
    try {
      //decode user profile from token
      const decryptedToken = await verifyAsync(token, this.jwtSecret);
      userprofile = Object.assign(
        {_id: '', name: ''},
        {_id: decryptedToken._id, name: decryptedToken.name},
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token:${error.message}`,
      );
    }
    return userprofile;
  }
}
