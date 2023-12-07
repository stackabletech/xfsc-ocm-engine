import type { ResponseType } from '../../common/response.js';
import type { TestingModule } from '@nestjs/testing';

import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import HealthController from '../health.controller.js';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('getHealth()', () => {
    let health: ResponseType;

    beforeEach(async () => {
      health = healthController.getHealth();
    });

    it(`should retrieve HTTP status created(${HttpStatus.OK})`, async () => {
      expect(health.statusCode).toEqual(HttpStatus.OK);
    });
  });
});
