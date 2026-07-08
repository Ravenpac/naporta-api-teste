import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    usuario: {
      findUnique: jest.fn(),
    },
  };

  const jwtMock = {
    sign: jest.fn().mockReturnValue('fake-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve realizar login com senha válida', async () => {
    prismaMock.usuario.findUnique.mockResolvedValue({
      id: '1',
      email: 'admin@naporta.com',
      senha: await bcrypt.hash('admin123', 10),
    });

    const result = await service.login({
      email: 'admin@naporta.com',
      senha: 'admin123',
    });

    expect(result).toEqual({
      access_token: 'fake-token',
    });
  });

  it('deve rejeitar senha inválida', async () => {
    prismaMock.usuario.findUnique.mockResolvedValue({
      id: '1',
      email: 'admin@naporta.com',
      senha: await bcrypt.hash('admin123', 10),
    });

    await expect(
      service.login({
        email: 'admin@naporta.com',
        senha: 'errada',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
