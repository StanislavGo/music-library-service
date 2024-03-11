import { IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  year: number;
  
  artistId: string | null;
}
