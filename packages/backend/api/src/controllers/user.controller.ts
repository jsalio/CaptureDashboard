import { controller, httpGet, httpPost, interfaces, requestBody, response } from "inversify-express-utils";
import * as express from 'express';
import { inject } from "inversify";
import { ContractType, IUserRepository, UserModel, GenericRequest, NormalizeApiResponses } from "@prodoctivity-dashboard/models";
import { CreateUser, ListUsers } from "@prodoctivity-dashboard/Core";

@controller('/users')
export class UserController implements interfaces.Controller, GenericRequest<UserModel> {
    constructor(@inject(ContractType.IUserRepository) private userRepository: IUserRepository) {
    }

    usermodel: UserModel;

    /**
     *
     *
     * @private
     * @param {UserModel} req
     * @param {express.Response} res
     * @memberof UserController
     */
    @httpPost('/')
    private async create(@requestBody() req: UserModel, @response() res: express.Response) {
        this.usermodel = req;
        const createUser = new CreateUser(this.userRepository, this);
        const validation = createUser.validate();
        console.log(validation);
        if (validation !== null) {
            res.status(400).json(validation);
            return
        }
        const userId = await createUser.execute();
        if (userId === undefined) {
            res.status(400).json(NormalizeApiResponses({
                id: null
            }, "Error when process request", '400'));
            return
        }
        res.status(200).json(NormalizeApiResponses({
            id: userId
        }, undefined, '200'));
    }

    /**
     *
     *
     * @private
     * @param {express.Response} res
     * @memberof UserController
     */
    @httpGet('/list')
    private async list(@response() res: express.Response) {
        const getUserList = new ListUsers(this.userRepository);
        const users = await getUserList.execute();
        res.status(200).json(NormalizeApiResponses(users, undefined, '200'));
    }

    build(): UserModel {
        return this.usermodel;
    }
}