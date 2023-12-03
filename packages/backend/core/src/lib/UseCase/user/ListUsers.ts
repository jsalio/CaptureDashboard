import { IUserRepository, Userview } from "@prodoctivity-dashboard/models";


/**
 * List users use case
 *
 * @export
 * @class ListUsers
 */
export class ListUsers {
    userRepository: IUserRepository;

    /**
     * Creates an instance of ListUsers.
     * @param {IUserRepository} userRepository
     * @memberof ListUsers
     */
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * perform the use case
     *
     * @return {*}  {Promise<Userview[]>}
     * @memberof ListUsers
     */
    async execute(): Promise<Userview[]> {
        const users = (await this.userRepository.list()).map((user) => {
            return {
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            } as Userview;
        });
        return users;
    }
}
