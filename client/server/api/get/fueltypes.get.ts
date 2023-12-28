import * as fuelTypeController from '~~/server/controller/fueltypes';

export default defineEventHandler((event) => {
    return fuelTypeController.read();
})