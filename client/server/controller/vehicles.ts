import { H3Event } from 'h3';
import * as vehicleModel from '~~/server/model/vehicles';

export const read = async () => {
    try {
        const result = await vehicleModel.read();

        return {
            data: result
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: "Чтение транспорта неудачно"
        })
    }
}
