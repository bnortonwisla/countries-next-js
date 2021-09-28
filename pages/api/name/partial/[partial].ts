/**
 * Internal (app) API end point for country partial name search
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSource, returnCountriesResponse, validateAndParseRequest } from '../../../../api-helper/server-request-utils';
import { CountriesResponse } from "../../../../model/response";

export default async function handlePartialName(req: NextApiRequest, res: NextApiResponse<CountriesResponse>): Promise<void> {
    
    const { valid, queryString: partialName } = validateAndParseRequest(req.query.partial, req, res);
    if (!valid) {
        return;
    }
    
    const countriesResponse = await getDataSource().fetchByPartialName(partialName);

    returnCountriesResponse(res, countriesResponse);
}