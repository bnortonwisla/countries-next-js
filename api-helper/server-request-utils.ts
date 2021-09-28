/**
 * Code used by server (internal) API routes to process requests and respond
 * Calls into DataSources, which handle calling external API/file 
 * 
 * Uses file source when USE_FILE_API = true, external API source otherwise
 */

import { NextApiRequest, NextApiResponse } from "next";
import { CountryFile, CountryAPI, DataSource } from "../datasource/country-filtered";
import { CountriesResponse, HTTPStatus, isErrorResponse, makeErrorResponse } from "../model/response";

const USE_FILE_API = true;

export function validateAndParseRequest(
        queryValue: string | string[], 
        req: NextApiRequest, 
        res: NextApiResponse<CountriesResponse>
): { valid: boolean, queryString: string } {

    let inputError: { type: string, info: string } | undefined;
    
    if (req.method !== "GET") {
        inputError = { type: "Unsupported method", info: "Only GET supported."};
    
    } else if (typeof queryValue !== "string" || Array.isArray(queryValue) || queryValue.length < 1) {
        inputError = { type: "Unsupported input", info: "Only string supported."};
    }

    if (inputError) {
        const statusCode = HTTPStatus.badRequest;
        res.status(statusCode).json(makeErrorResponse(statusCode, inputError.type, inputError.info));
        return { valid: false, queryString: "" };
    }

    return { valid: true, queryString: queryValue as string };
}  //TODO separate these functions out, use Omit

export function getDataSource(): DataSource {
    return USE_FILE_API ? new CountryFile() : new CountryAPI();
}

export function returnCountriesResponse(res: NextApiResponse<CountriesResponse>, countriesResponse: CountriesResponse): void {
    if (isErrorResponse(countriesResponse)) {
        res.status(countriesResponse.error.code).json(countriesResponse);
    
    } else if (countriesResponse.length < 1) {
        const code = HTTPStatus.notFound;
        res.status(code).json(makeErrorResponse(code, "not found", "Data source returned empty list."));
    
    } else {       
        res.status(HTTPStatus.success).json(countriesResponse);
    }
}

