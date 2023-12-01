import { PrismaClient } from '@prisma/client';
import { ContractType, IUserRepository, UserModel } from '@prodoctivity-dashboard/models';
import { inject, injectable } from 'inversify';

/**
 * User repository implementation
 *
 * @export
 * @class UserRepository
 * @implements {IUserRepository}
 */
@injectable()
export class UserRepository implements IUserRepository {

    client: PrismaClient;
    /**
     * Creates an instance of UserRepository.
     * @param {PrismaClient} client
     * @memberof UserRepository
     */
    constructor(@inject(ContractType.PrismaClient) client: PrismaClient) {
        this.client = client;
    }

    async create(user: UserModel): Promise<number | undefined> {
        const newUser = await this.client.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return newUser.id;
    }
    async list(): Promise<UserModel[]> {
        const dataSet = await this.client.user.findMany();
        return dataSet.map((user) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            } as UserModel;
        });
    }
    async findOneByField(field: string, value: string | number): Promise<UserModel | null> {

        const convertInputToWhere = (field: string, value: string | number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const where: any = {};
            where[field] = value;
            return where;
        }

        const row = await this.client.user.findUnique({
            where: convertInputToWhere(field, value),
        });
        if (row === null) {
            return null;
        }
        return {
            id: row.id,
            email: row.email,
            name: row.name,
            password: row.password,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        } as UserModel;
    }
    async update(id: number, user: UserModel): Promise<UserModel | null> {
        const updatedUser = await this.client.user.update({
            where: {
                id: id,
            },
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
                updatedAt: new Date(),
            },
        });
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            password: updatedUser.password,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        } as UserModel;
    }
    async delete(id: number): Promise<UserModel | null> {
        const deletedUser = await this.client.user.delete({
            where: {
                id: id,
            },
        });
        return {
            id: deletedUser.id,
            email: deletedUser.email,
            name: deletedUser.name,
            password: deletedUser.password,
            createdAt: deletedUser.createdAt,
            updatedAt: deletedUser.updatedAt,
        } as UserModel;
    }

    async exists(field: string, value: string): Promise<boolean> {
        const convertInputToWhere = (field: string, value: string | number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const where: any = {};
            where[field] = value;
            return where;
        };

        const row = await this.client.user.findUnique({
            where: convertInputToWhere(field, value),
        });
        return row !== null;
    }


}
