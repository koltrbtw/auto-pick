import { H3Event } from 'h3';
import * as fuelTypeModel from '~~/server/model/fueltypes';

export const read = async () => {
    try {
        const result = await fuelTypeModel.read();

        return {
            data: result
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: "Чтение типов топлива неудачно"
        })
    }
}
