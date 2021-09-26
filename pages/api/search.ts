import type { NextApiRequest, NextApiResponse } from 'next'
import { CountryJSON } from "../../api-helper/datasource-json";
import { HTTPStatus, CountriesResponse, isIErrorResponse } from "../../model/response";

export default async (req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> => {

    const searchText = req.query.searchText;
    if (req.method !== "GET" ||  typeof searchText !== "string" || Array.isArray(searchText) || searchText.length < 1) {
        res.status(400);
    }

    console.log(searchText);
    
    const countryAPI = new CountryJSON();
    const countriesResponse = await countryAPI.fetchByPartialName(searchText as string);
    
    return;
}

/*
Next.js has default error handling built-in. If you throw in an API route (or await on a Promise that rejects) 
and you don't catch the exception in your code then Next will catch it, print it to stderr and respond with status 500. '
So you don't have to worry about unhandled exceptions or promise rejections.
*/