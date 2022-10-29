import { Injectable } from '@nestjs/common';
import { Message } from '@nx-task-management/api-interfaces';

@Injectable()
export class HelloService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
