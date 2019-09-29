export interface FacilityModel{
    id: number,
    name: string,
    description?: string,
    code: string,
    buildDate?: Date,
    companyId: number
}

export interface UserModel{
    userName: string,
     password: string,
     id: number,
     fullName: string,
     isLogged: boolean,
     companyName: string,
     companyId: number,
     role: string
}

