import * as userController from '~~/server/controller/users';

export default defineEventHandler((event) => {
    return userController.trySignUp(event);
})