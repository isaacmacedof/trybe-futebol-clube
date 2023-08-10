import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'secretpass';

type Payload = {
  email: string,
  password: string
};

const options: SignOptions = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

class JWT {
  private static jS = JWT_SECRET_KEY;
  private static oP = options;

  static hashO(payload: Payload): string {
    return sign({ ...payload }, JWT_SECRET_KEY, options);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.jS) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}

export default JWT;
