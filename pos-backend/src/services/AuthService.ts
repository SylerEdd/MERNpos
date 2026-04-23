import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { LoginRequest } from "../dto/auth/LoginRequest";
import { LoginResponse } from "../dto/auth/LoginResponse";
import { UserResponse } from "../dto/user/UserResponse";

const userRepository = new UserRepository();

//Handles the authentication logic
export class AuthService {
  async login(request: LoginRequest): Promise<{
    response: LoginResponse;
    userId: number;
    username: string;
    fullName: string;
    roles: string[];
  }> {
    if (!request.username || !request.password) {
      throw new Error("Username and password are required");
    }

    // check if the user exists
    const user = await userRepository.findByUsername(request.username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    //compare the submitted password withe the bcrypted hash password
    const passwordMatch = await bcrypt.compare(
      request.password,
      user.passwordHash,
    );
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    // getting the roles to decide what user can do with the roles.
    const roleNames = Array.isArray(user.roles)
      ? user.roles.map((role: any) =>
          typeof role === "object" ? role.name : String(role),
        )
      : [];

    return {
      response: {
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          roles: roleNames,
        },
      },
      // these are stored in the session by the controller
      userId: user.id,
      username: user.username,
      fullName: user.fullName,
      roles: roleNames,
    };
  }
  async quickLogin(
    userId: number,
  ): Promise<{
    id: number;
    username: string;
    fullName: string;
    roles: string[];
  }> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const roleNames = Array.isArray(user.roles)
      ? user.roles.map((role: any) =>
          typeof role === "object" ? role.name : String(role),
        )
      : [];

    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      roles: roleNames,
    };
  }
}
