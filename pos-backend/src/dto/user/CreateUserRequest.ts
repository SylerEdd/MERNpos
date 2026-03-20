export interface CreateUserRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
  roles: number[];
}
