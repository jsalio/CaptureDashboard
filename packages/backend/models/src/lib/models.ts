/**
 * User model interface definition
 */
export type UserModel = {
  /**
   *  the user's email address
   *
   * @type {string}
   */
  email: string;
  /**
   * the user's name
   *
   * @type {string}
   */
  name: string;
  /**
   * the user's password
   *
   * @type {string}
   */
  password: string;
  /**
   * the date the user was created
   *
   * @type {Date}
   */
  createdAt: Date;
  /**
   * the date the user was last updated
   *
   * @type {Date}
   */
  updatedAt: Date;
}


