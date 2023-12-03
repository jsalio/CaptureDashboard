import { Container } from 'inversify';
import 'reflect-metadata';
import { prismaCnx } from '../../persistence/src/lib/prisma-connection';
import { ContractType, IUserRepository } from '@prodoctivity-dashboard/models';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '@prodoctivity-dashboard/persistence';

const container = new Container();

container.bind<PrismaClient>(ContractType.PrismaClient).toConstantValue(prismaCnx);
container.bind<IUserRepository>(ContractType.IUserRepository).to(UserRepository);

export { container }