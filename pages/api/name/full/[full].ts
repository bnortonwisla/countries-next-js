/**
 * Internal (app) API end point for country full/exact name search
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSource, returnCountriesResponse, validateAndParseRequest } from '../../../../api-helper/server';
import { CountriesResponse } from "../../../../model/response";

export default async function handleFullName(req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> {

    const { valid, queryString: name } = validateAndParseRequest(req.query.full, req, res);
    if (!valid) {
        return;
    }
    
    const countriesResponse = await getDataSource().fetchByFullName(name);
    
    returnCountriesResponse(res, countriesResponse);
}