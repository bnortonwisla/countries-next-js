import type { NextApiRequest, NextApiResponse } from 'next'
import { MockCountryAPI } from "../../../api-helper/MockCountryAPI";
import { HTTPStatus, CountriesResponse, isIErrorResponse } from "../../../model/response";

export default async (req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> => {

    const searchText = req.query.searchText;
    if (req.method !== "GET" ||  typeof searchText !== "string" || Array.isArray(searchText) || searchText.length < 1) {
        res.status(400);
    }

    console.log(searchText);
    
    const countryAPI = new MockCountryAPI();
    const countriesResponse = await countryAPI.fetchByPartialName(searchText as string);

    if (isIErrorResponse(countriesResponse)) {
        res.status(countriesResponse.error.code).json(countriesResponse);
    } else if (countriesResponse.length < 1) {
        const code = HTTPStatus.notFound;
        res.status(code).json({ success: false, error: { code: code, info: searchText + " not found", type: "not found" }});
    } else {
        res.status(HTTPStatus.success).json(countriesResponse);
    }
    
    return;
}