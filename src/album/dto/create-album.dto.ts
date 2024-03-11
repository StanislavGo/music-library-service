import { IsNotEmpty } from "class-validator";

export class CreateAlbumDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;
  
  artistId: string | null;
}
