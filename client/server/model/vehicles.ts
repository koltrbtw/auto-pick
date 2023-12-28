import { sql } from '~~/server/db';

export type VehicleModel = {
    id: number,
    brandid: number,
    name: string,
    enginePower: number,
    fuelTank: number,
    fuelType: number,
    configurationid: number,
    classid: number
}

export const read = async() => {
    const result = await sql({
        query: "SELECT * FROM vehicles"
    });

    return result as VehicleModel[];
}

/*export const create = async (data: Pick<VehicleModel, 'brandid' | 'name' | 'enginePower' | 
'fuelTank' | 'fuelType' | 'configurationid' | 'classid'>) => {
    const result = await sql({
        query: `INSERT INTO vehicles(brandid, name, \`enginePower\`, \`fuelTank\`
        \`fuelType\`)`
    })
}*/