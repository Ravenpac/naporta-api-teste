/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Pedidos E2E', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve realizar login e retornar JWT', async () => {
    const response = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'admin@naporta.com',
      senha: 'admin123',
    });

    expect(response.statusCode).toBe(201);

    expect(response.body.access_token).toBeDefined();

    token = response.body.access_token;
  });

  it('deve criar pedido autenticado', async () => {
    const response = await request(app.getHttpServer())
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        numeroPedido: 'PED-E2E-001',

        dataPrevisaoEntrega: '2026-07-20',

        clienteNome: 'Cliente Teste',

        clienteDocumento: '12345678900',

        enderecoEntrega: 'Rua dos Testes, 100',

        status: 'PENDENTE',

        itens: [
          {
            descricao: 'Produto teste',

            preco: 99.9,
          },
        ],
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty('id');

    expect(response.body.numeroPedido).toBe('PED-E2E-001');
  });

  it('não deve acessar pedidos sem token', async () => {
    const response = await request(app.getHttpServer()).get('/pedidos');

    expect(response.statusCode).toBe(401);
  });

  it('deve listar pedidos autenticado', async () => {
    const response = await request(app.getHttpServer())
      .get('/pedidos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
