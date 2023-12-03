import { GenericRequest, IUserRepository, UserModel } from "@prodoctivity-dashboard/models";
import { IValidator, Validator, ValidationResult } from 'ts.validator.fluent/dist';

/**
 * Create user use case
 *
 * @export
 * @class CreateUser
 */
export class CreateUser {
    userRepository: IUserRepository;
    request: GenericRequest<UserModel>;

    /**
     * Creates an instance of CreateUser.
     * @param {IUserRepository} userRepository
     * @param {GenericRequest<UserModel>} request
     * @memberof CreateUser
     */
    constructor(userRepository: IUserRepository, request: GenericRequest<UserModel>) {
        this.userRepository = userRepository;
        this.request = request;
    }

    /**
     * validate the request
     *
     * @memberof CreateUser
     */
    validate() {
        const request = this.request.build();
        const validator = new Validator(request).Validate(validateNewUser);
        console.log(validator);
        if (!validator.IsValid) {
            return validator.Errors.join('\n');
        }
        return null;
    }


    /**
     * perform the use case
     *
     * @return {*}  {(Promise<number | undefined>)}
     * @memberof CreateUser
     */
    async execute(): Promise<number | undefined> {

        const request = this.request.build();
        console.log(request);
        const userId = await this.userRepository.create(request);
        return userId;
    }
}


const validateNewUser = (validator: IValidator<UserModel>): ValidationResult => {
    return validator
        .NotNull(x => x.email, 'Email cannot be null')
        .NotEmpty(x => x.email, 'Email cannot be empty')
        .NotNull(x => x.name, 'Name cannot be null')
        .NotEmpty(x => x.name, 'Name cannot be empty')
        .NotNull(x => x.password, 'Password cannot be null')
        .NotEmpty(x => x.password, 'Password cannot be empty')
        .ToResult();
}