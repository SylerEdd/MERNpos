export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    fullName: string;
    roles: string[];
  };
}
