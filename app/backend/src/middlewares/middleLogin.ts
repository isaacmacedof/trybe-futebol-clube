import { NextFunction, Request, Response } from 'express';

class loginVali {
  static valiLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const veriLogin = emailRegex.test(email);
    const veriPassword = password.length > 6;
    console.log(!veriPassword, !veriLogin);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!veriLogin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!veriPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default loginVali;
