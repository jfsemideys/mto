import {UserModel} from '../Interfaces/Interfaces';

export const GetUsers = () : Promise<UserModel[]> =>
    Promise.resolve(require('../Data/Users.json'))