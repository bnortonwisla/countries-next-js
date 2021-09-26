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
    badRequest = 400,
    notFound = 404,
    success = 200,
}

export function makeErrorResponse(statusCode: HTTPStatus, type: string, info: string): IErrorResponse {
    return { success: false, error: { code: statusCode, type: type, info: info}}; 
}

export function isIErrorResponse(res?: CountriesResponse): res is IErrorResponse {
    if (!res) {
        return false;
    }
    
    return "error" in res; 
}