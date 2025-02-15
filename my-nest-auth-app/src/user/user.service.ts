import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel(User.name) private readonly userModel : Model<UserDocument> 
  ) {}

  async create(RegisterDto: RegisterDto): Promise<User> {
    const newUser = new this.userModel(RegisterDto);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

}
