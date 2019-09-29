import {FacilityModel} from '../Interfaces/Interfaces';

export const GetFacilities = () : Promise<FacilityModel[]> =>
    Promise.resolve(require('../Data/Facilities.json'));