import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { Repository } from 'typeorm';
import { USER_ID_HEADER } from '../const/headers.const';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const repository = Repository<Client>;
  const request = ctx.switchToHttp().getRequest();

  return request[USER_ID_HEADER];
});
