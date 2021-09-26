import type { NextApiRequest, NextApiResponse } from 'next'
import { CountryFile } from "../../../../datasource/obsolete-country-file";
import { getDataSource, returnCountriesResponse, validateAndParseRequest } from '../../../../api-helper/server';
import { CountriesResponse } from "../../../../model/response";

export default async (req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> => {

    const { valid, queryString: name } = validateAndParseRequest(req.query.full, req, res);
    if (!valid) {
        return;
    }
    
    const countriesResponse = await getDataSource().fetchByFullName(name);
    
    returnCountriesResponse(res, countriesResponse);
}