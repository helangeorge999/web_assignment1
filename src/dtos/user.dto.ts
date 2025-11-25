export interface CreateUserDTO {
  id: string;
  username: string;
  email: string;
  name: string;
  age?: number;
}

export interface UpdateUserDTO {
  username: string;
  email: string;
  name: string;
  age?: number;
}
