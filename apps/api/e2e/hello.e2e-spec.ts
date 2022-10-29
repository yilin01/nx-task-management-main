import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('HelloController e2e test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('hello return back', () => {
    const URL = '/api/hello';
    it('should get data', () => {
      return request(app.getHttpServer())
        .get(URL)
        .expect(200)
        .expect('{"message":"Welcome to api!"}');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
