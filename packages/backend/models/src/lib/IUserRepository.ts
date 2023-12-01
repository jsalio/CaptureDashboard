import { UserModel } from "./models";

/**
 * User repository interface definition
 *
 * @export
 * @interface IUserRepository
 */
export interface IUserRepository {
    /**
     * Creates a new user in the database
     *
     * @param {UserModel} user
     * @return {*}  {(Promise<number | undefined>)}
     * @memberof IUserRepository
     */
    create(user: UserModel): Promise<number | undefined>;
    /**
     * retrieve a list of users from the database
     *
     * @param {number} id
     * @return {*}  {(Promise<UserModel | null>)}
     * @memberof IUserRepository
     */
    list(): Promise<UserModel[]>;

    /**
     * retrieve a single user from the database
     *
     * @param {string} field
     * @param {string} value
     * @return {*}  {(Promise<UserModel | null>)}
     * @memberof IUserRepository
     */
    findOneByField(field: string, value: string): Promise<UserModel | null>;

    /**
     * update a single user in the database
     *
     * @param {number} id
     * @param {UserModel} user
     * @return {*}  {(Promise<UserModel | null>)}
     * @memberof IUserRepository
     */
    update(id: number, user: UserModel): Promise<UserModel | null>;

    /**
     * remove a single user from the database
     *
     * @param {number} id
     * @return {*}  {(Promise<UserModel | null>)}
     * @memberof IUserRepository
     */
    delete(id: number): Promise<UserModel | null>;

    /**
     * check if a user exists in the database
     *
     * @param {string} field
     * @param {string} value
     * @return {*}  {Promise<boolean>}
     * @memberof IUserRepository
     */
    exists(field: string, value: string): Promise<boolean>;

}
