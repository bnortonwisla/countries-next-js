import type { NextApiRequest, NextApiResponse } from 'next'
import { CountryJSON } from "../../../api-helper/datasource-json";
import { countriesResponseHandler } from '../../../api-helper/response-handler';
import { HTTPStatus, CountriesResponse, isIErrorResponse } from "../../../model/response";

export default async (req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> => {

    const searchText = req.query.searchText;
    if (req.method !== "GET" ||  typeof searchText !== "string" || Array.isArray(searchText) || searchText.length < 1) {
        res.status(400);
    }

    console.log(searchText);
    
    const countryAPI = new CountryJSON();
    const countriesResponse = await countryAPI.fetchByPartialName(searchText as string);

    countriesResponseHandler(res, countriesResponse);
}