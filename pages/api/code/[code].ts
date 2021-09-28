/**
 * Internal (app) API end point for country code search
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSource, returnCountriesResponse, validateAndParseRequest } from '../../../api-helper/server-request-utils';
import { CountriesResponse } from "../../../model/response";

export default async function handleCode(req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> {
    
    const { valid, queryString: code } = validateAndParseRequest(req.query.code, req, res);
    if (!valid) {
        return;
    }

    const countriesResponse = await getDataSource().fetchByCode(code);
    
    returnCountriesResponse(res, countriesResponse);
}