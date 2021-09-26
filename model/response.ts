import { ICountry } from "./country";

export type CountriesResponse = ICountry[] | IErrorResponse

export interface IErrorResponse {
    success: boolean;
    error: IError;
}

export interface IError {
    code: number;
    type: string;
    info: string;
}

export enum HTTPStatus {
    notFound = 404,
    success = 200,
}

export function isIErrorResponse(res?: CountriesResponse): res is IErrorResponse {
    if (!res) {
        return false;
    }
    
    return "error" in res; 
}