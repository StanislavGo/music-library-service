import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
  
  artistId: string | null;
}
