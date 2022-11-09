import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { USER_ID_HEADER } from '../const/headers.const';

export const UserId = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.headers[USER_ID_HEADER];
});
