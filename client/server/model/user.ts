import { sql } from '~~/server/db';
import { encrypt, generateRandom } from '~~/server/utils';

export type UserModel = {
    id: number,
    roleid: number,
    login: string,
    password: string,
    firstname: string,
    lastname: string,
    surname: string,
    token: string
}

export const loginExist = async(login: string) => {
    const result = await sql({
        query: "SELECT * FROM users WHERE login = ?",
        values: [ login ]
    });

    return (result as UserModel[]).length === 1;
}

export const accountExist = async(login: string, password: string) => {
    const resultExist = await sql({
        query: "SELECT * FROM users WHERE login = ? AND password = ?",
        values: [ login, encrypt(password) ]
    });

    const exist = (resultExist as UserModel[]).length === 1;

    if (!exist)
        return "";

    const token = generateRandom();

    const result = await sql({
        query: `UPDATE users SET token=? WHERE login=?`,
        values: [ token, login ]
    });

    return token;
}

export const create = async(data: Pick<UserModel, 'login' | 'password'>) => {
    const token = generateRandom();

    const result = await sql({
        query: `INSERT INTO users (roleid, login, password, token) VALUES(?,?,?,?)`,
        values: [ 1, data.login, encrypt( data.password ), token ]
    });

    return token;
}

export const detail = async(id: number) => {
    const result = await sql({
        query: "SELECT * FROM users WHERE id = ?",
        values: [ id ]
    });

    return result as UserModel[];
}