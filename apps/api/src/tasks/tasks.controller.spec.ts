import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const mockTasksService = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTaskStatus: jest.fn(),
});

describe('TasksController', () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useFactory: mockTasksService },],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });
});
