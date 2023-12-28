import { sql } from '~~/server/db';

export type FuelTypeModel = {
    id: number,
    name: string
}

export const read = async() => {
    const result = await sql({
        query: "SELECT * FROM fueltypes"
    });

    return result as FuelTypeModel[];
}