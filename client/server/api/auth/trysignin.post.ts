import * as userController from '~~/server/controller/users';

export default defineEventHandler((event) => {
    return userController.trySignIn(event);
})