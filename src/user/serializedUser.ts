import { Exclude } from "class-transformer";

export class SerializedUser {
  id: string;
  login: string;

  @Exclude()
  password: string;
  
  version: number;
  createdAt: number;
  updatedAt: number;
};