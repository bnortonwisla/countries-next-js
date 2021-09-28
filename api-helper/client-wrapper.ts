/**
 * Code to facilite calls to country search internal API (routes) from client
 */

import { CountriesResponse } from "../model/response";

export enum SearchType {
    code = "code",
    fullName = "fullName",
    partialName = "partialName",
}

export async function getCountryListFromServer(searchText: string, searchType: SearchType): Promise<CountriesResponse> {
    const res = await fetch(makeURL(searchText, searchType));
    return await res.json();
};

function makeURL(searchText: string, searchType: SearchType): string {
    const baseURL = "http://localhost:3000/api/"
    let path: string;
    switch (searchType) {
        case SearchType.code:
            path = "code/";
            break;
        case SearchType.partialName:
            path = "name/partial/";
            break;
        case SearchType.fullName: 
            path = "name/full/";
            break;
        default:
            throw "Invalid SearchType";
    }

    return baseURL + path + searchText;
}