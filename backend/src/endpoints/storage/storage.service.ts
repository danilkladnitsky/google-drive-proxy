import { UserService } from '../user/user.service';

export class StorageService {
  constructor(private readonly userService: UserService) {}

  async getFiles(userId: number, folderName: string) {
    const user = await this.userService.getUserById(userId);
  }
}
