import { INestApplication, Body } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const testUser = 'user-foo'; //note: make sure this user isn't in db yet

describe('AuthController e2e test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('should signup a new user', () => {
    const URL = '/api/auth/signup';
    return request(app.getHttpServer())
      .post(URL)
      .send({
        username: testUser,
        password: 'Password1$',
      })
      .expect(201);
  });

  describe('Auth then getTasks', () => {
    let accessToken;
    it('should getTasks after signin', (done) => {
      const URL = '/api/auth/signin';
      request(app.getHttpServer())
        .post(URL)
        .set('Accept', 'application/json')
        .send({
          username: testUser,
          password: 'Password1$',
        })
        .expect(201)
        .end((err, res) => {
          accessToken = res.body.accessToken;
          done();
        });
    });
    it('getTasks', async () => {
      return request(app.getHttpServer())
        .get('/api/tasks')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
