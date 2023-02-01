import { HttpException, HttpStatus } from '@nestjs/common';
export function isEmpty(object: Object): HttpException | void {
  if (Object.keys(object).length === 0)
    throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
}
