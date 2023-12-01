import { PrismaClient } from '@prisma/client';
/**
 * Prisma connection instance to be used in the application.
 */
export const prismaCnx: PrismaClient = new PrismaClient({
    errorFormat: 'minimal',
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ],
});
