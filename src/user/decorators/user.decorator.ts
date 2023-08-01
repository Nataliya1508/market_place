import { ExpressRequestInterfase } from '@app/types/expressRequest.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterfase>();

  if (!request.user) {
    return null;
  } else if (data) {
    return request.user[data];
  }
  return request.user;
});
