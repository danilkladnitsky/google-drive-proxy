import { Controller, Delete, Get, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/common/dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDTO> {
    const result = await this.userService.getUserById(id);
    return plainToInstance(UserDTO, result);
  }

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    const result = await this.userService.getUsers();
    return plainToInstance(UserDTO, result);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    return await this.userService.deleteUser(id);
  }
}
