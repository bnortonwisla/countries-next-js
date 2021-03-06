/**
 * Types and functions for modeling response from the external API
 * 
 * Shared with client since the model isn't altered by internal API before passing up,
 * though some instances are created by our API routes using same model   
 */

import { Country } from "./country";

export type CountriesResponse = Country[] | ErrorResponse

export interface ErrorResponse {
    success: boolean;
    error: ErrorInformation;
}

interface ErrorInformation {
    code: number;
    type: string;
    info: string;
}

export enum HTTPStatus {
    internalServerError = 500,
    badRequest = 400,
    notFound = 404,
    success = 200,
}

export function makeErrorResponse(statusCode: HTTPStatus, type: string, info: string): ErrorResponse {
    return { success: false, error: { code: statusCode, type: type, info: info}}; 
}

export function isErrorResponse(res?: CountriesResponse): res is ErrorResponse {
    if (!res) {
        return false;
    }
    
    return "error" in res; 
}