import { CreateUserRequest } from "../dto/user/CreateUserRequest";
import { User, IUser } from "../entities/User";

//UserRepository with methods: findAll, findById, findByUsername, findByEmail, create, update, delete
//findByUsername and findByEmail are used for authentication and validation purposes
//create method will hash the password before saving to the database, we will use bcrypt for hashing

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return User.find().exec();
  }

  async findById(id: number): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async create(data: CreateUserRequest): Promise<IUser> {
    const user = new User(data);
    return user.save();
  }

  async update(
    id: number,
    data: Partial<CreateUserRequest>,
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: number): Promise<void> {
    await User.findByIdAndDelete(id).exec();
  }
}
