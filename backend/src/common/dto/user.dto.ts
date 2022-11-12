import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  picture?: string;
}
