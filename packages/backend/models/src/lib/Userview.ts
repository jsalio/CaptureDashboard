/**
 * litle model for the user view
 */
export type Userview = {
    /**
     * the user's email address
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
     * @type {Date}
     */
    createdAt: Date;
    /**
     * the date the user was last updated
     *
     * @type {Date}
     */
    updatedAt: Date;
};
