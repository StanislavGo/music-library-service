import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrackDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
