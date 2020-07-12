import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/users', async () => {
    const input = {
      name: 'a',
      email: 'a@a.com',
      password: 'aaaaaaaa',
    };
    await request(app.getHttpServer())
      .post('/api/users')
      .send(input)
      .expect(201);
  });

  it('GET /api/users', async () => {
    const users = await request(app.getHttpServer())
      .get('/api/users')
      .expect(200);
    expect(users.body[0].id).toBe(1);
    expect(users.body[0].name).toBe('a');
  });

  it('GET /api/users/a', async () => {
    const user = await request(app.getHttpServer())
      .get('/api/users/a')
      .expect(200);
    expect(user.body.id).toBe(1);
    expect(user.body.name).toBe('a');
  });
});
