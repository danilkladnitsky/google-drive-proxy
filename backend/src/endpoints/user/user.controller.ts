import { Controller, Get, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/common/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDTO> {
    const result = await this.userService.getUserById(id);
    return plainToInstance(UserDTO, result);
  }
}
