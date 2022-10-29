import { Controller, Get } from '@nestjs/common';

import { Message } from '@nx-task-management/api-interfaces';

import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('hello')
  getData(): Message {
    return this.helloService.getData();
  }
}
