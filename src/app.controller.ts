import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus(): { status: string } {
    return { status: 'ok' };
  }
}
