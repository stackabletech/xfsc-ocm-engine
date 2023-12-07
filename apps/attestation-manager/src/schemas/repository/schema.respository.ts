import type { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import PrismaService from '../../prisma/prisma.service.js';

@Injectable()
export default class SchemaRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createSchema(data: Prisma.SchemaCreateInput) {
    return this.prismaService.schema.create({
      data,
      include: {
        attribute: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async findSchemas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SchemaWhereUniqueInput;
    where?: Prisma.SchemaWhereInput;
    orderBy?: Prisma.SchemaOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.$transaction([
      this.prismaService.schema.count({
        where,
      }),
      this.prismaService.schema.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          attribute: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);
  }

  public async findUniqueSchema(params: {
    where: Prisma.SchemaWhereUniqueInput;
  }) {
    const { where } = params;
    return this.prismaService.schema.findUnique({
      where,
      include: {
        attribute: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
