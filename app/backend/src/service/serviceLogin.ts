import * as bcrypt from 'bcryptjs';
import { Role } from '../types/Login';
import { User } from '../types/User';
import JWT from '../utils/jwt';
import UserModel from '../database/models/user.model';

type token = {
  token: string
};

class serviceLogin {
  private model = UserModel;
  private jwt = JWT;

  public async login(user: User): Promise<token | null > {
    const { email, password } = user;
    const loginU = await this.model.findOne({ where: { email } }) || null;
    if (!loginU) return null;
    const passwordIsTrue = bcrypt.compareSync(password, loginU.password);
    if (!passwordIsTrue) return null;
    const token = this.jwt.hashO({ email: loginU.email, password: loginU.password });
    return { token };
  }

  public async getRole(token: string | undefined): Promise<Role | null> {
    if (token === undefined) return null;
    const undecodedToken = this.jwt.verify(token);
    if (typeof undecodedToken === 'string') return null;
    const { email } = undecodedToken;
    const loginR = await this.model.findOne({ where: { email } }) || null;
    if (!loginR) return null;
    return { role: loginR.role };
  }
}

export default serviceLogin;
