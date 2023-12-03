import { IUserRepository, Userview } from "@prodoctivity-dashboard/models";



export class ListUsers {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

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
