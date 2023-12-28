import * as vehicleController from '~~/server/controller/vehicles';

export default defineEventHandler((event) => {
    return vehicleController.read();
})