import { NextApiRequest, NextApiResponse } from "next";
import { CountriesResponse, HTTPStatus, isIErrorResponse, makeErrorResponse } from "../model/response";

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
}

export function returnCountriesResponse(res: NextApiResponse<CountriesResponse>, countriesResponse: CountriesResponse): void {
    if (isIErrorResponse(countriesResponse)) {
        res.status(countriesResponse.error.code).json(countriesResponse);
    
    } else if (countriesResponse.length < 1) {
        const code = HTTPStatus.notFound;
        res.status(code).json({ success: false, error: { code: code, info: " not found", type: "not found" }});
    
    } else {
        res.status(HTTPStatus.success).json(countriesResponse);
    }
}