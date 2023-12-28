import { H3Event } from 'h3';
import * as userModel from '~~/server/model/user';

export const checkToken = async (evt: H3Event) => {
    try {

    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: "Проверка токена неудачна"
        })
    }
}

export const trySignIn = async (evt: H3Event) => {
    try {
        const body = await readBody(evt);
        const loginExist = await userModel.loginExist(body.login);

        if (!loginExist)
            return {
                status: "error",
                field: "login",
                data: "Такого логина не существует"
            }

        const accountToken = await userModel.accountExist(body.login, body.password);
        
        if (accountToken == "")
            return {
                status: "error",
                field: "password",
                data: "Пароль некорректный"
            }

        return accountToken;
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: "Авторизация неудачна"
        })
    }
}

export const trySignUp = async (evt: H3Event) => {
    try {
        const body = await readBody(evt);
        const loginExist = await userModel.loginExist(body.login);

        if (body.login.length < 3)
            return {
                status: "error",
                field: "login",
                data: "Длина логина должна быть от 3х символов"
            }

        if (loginExist)
            return {
                status: "error",
                field: "login",
                data: "Данный логин уже занят"
            }

        const passwordNotCorrect = body.password.length < 6;

        if (passwordNotCorrect)
            return {
                status: "error",
                field: "password",
                data: "Длина пароля должна быть больше 6 символов"
            }

        const authToken = await userModel.create({
            login: body.login,
            password: body.password
        });

        return {
            status: "succ",
            data: authToken
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: "Регистрация неудачна"
        })
    }
}
