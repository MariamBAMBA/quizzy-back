import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    const { email, password, username } = signupDto;

    // Vérifier si l'email est déjà utilisé
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email déjà utilisé');
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();

    // Générer le token JWT
    const payload = { id: newUser._id, email: newUser.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
