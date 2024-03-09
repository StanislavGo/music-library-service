import { Exclude } from "class-transformer";

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<User>) {
    this.id = partial.id;
    this.login = partial.login;
    this.password = partial.password;
    this.version = partial.version;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  };
}
