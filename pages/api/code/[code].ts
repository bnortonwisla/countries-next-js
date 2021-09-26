import type { NextApiRequest, NextApiResponse } from 'next'
import { CountryFile } from "../../../datasource/country-file";
import { returnCountriesResponse, validateAndParseRequest as requestValidation } from '../../../routing/request-response';
import { CountriesResponse } from "../../../model/response";

export default async (req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> => {
    
    const { valid, queryString: code } = requestValidation(req.query.code, req, res);
    if (!valid) {
        return;
    }

    const countryAPI = new CountryFile();
    const countriesResponse = await countryAPI.fetchByCode(code);
    
    returnCountriesResponse(res, countriesResponse);
}