/**
 * @packageDocumentation
 * This file is used to define the contract types for the dependency injection container.
 * This is a good practice to avoid circular dependencies.
 * 
 *  @module ContractType
 */
export const ContractType = {
    /**
     * User model interface definition
     * */
    IUserRepository: Symbol.for("IUserRepository"),
    /**
     *  Prisma connection instance to be used in the application.
     * */
    PrismaClient: Symbol.for("PrismaClient")
};
