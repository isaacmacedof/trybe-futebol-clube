import * as bcrypt from 'bcryptjs';
import { User } from '../types/User';
import JWT from '../utils/jwt';
import UserModel from '../database/models/user.model';

class serviceLogin {
  private model = UserModel;
  private jwt = JWT;

  public async login(user: User): Promise<string | null > {
    console.log(user);

    const { email, password } = user;
    const loginU = await this.model.findOne({ where: { email } }) || null;
    if (!loginU) return null;
    const passwordIsTrue = bcrypt.compareSync(password, loginU.password);
    if (!passwordIsTrue) return null;
    const token = this.jwt.hashO({ email: loginU.email, password: loginU.password });
    return token;
  }
}

export default serviceLogin;
