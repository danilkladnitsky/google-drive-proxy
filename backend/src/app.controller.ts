import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  getHello() {
    return { message: 'server is alive!' };
  }
}
