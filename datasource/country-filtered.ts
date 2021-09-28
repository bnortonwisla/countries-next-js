/**
 * Classes for calling into the external countries API or file extract of its contents
 * These work be getting all countries from API/file and then filtering
 * 
 * Which API used is controlled by USE_FILE_API constant in api-helper/server.ts
 */

import allCountries from "../data/allCountries.json"
import { CountriesResponse, HTTPStatus, isErrorResponse, makeErrorResponse } from "../model/response";

export interface DataSource{
    fetchByPartialName(name: string): Promise<CountriesResponse>;
    fetchByFullName(name: string): Promise<CountriesResponse>;
    fetchByCode(code: string): Promise<CountriesResponse>;
}

export abstract class CountrySource implements DataSource {

    public async fetchByPartialName(name: string): Promise<CountriesResponse> {
        const countries = await this.onFetchAll();
        return (
            isErrorResponse(countries) ? countries :
            countries.filter((country) => CountrySource.includes(name, country.name))
        );
    }

    public async fetchByFullName(name: string): Promise<CountriesResponse> {
        const countries = await this.onFetchAll();
        return (
            isErrorResponse(countries) ? countries :  
            countries.filter((country) => CountrySource.matches(name, country.name))
        );
    }

    public async fetchByCode(code: string): Promise<CountriesResponse> {
        const countries = await this.onFetchAll();
        return (
            isErrorResponse(countries) ? countries :  
            countries.filter((country) => CountrySource.matches(code, country.alpha2Code, country.alpha3Code))
        );
    }

    protected async onFetchAll(): Promise<CountriesResponse> {
        throw "Abstract method";
    }

    private static includes(searchFor?: string, findIn?: string): boolean {
        if (!searchFor || !findIn) {
            return false;
        }
        return findIn.toUpperCase().includes(searchFor.toUpperCase())
    }

    private static matches(searchFor?: string, ... matchIn: string[]): boolean {
        if (!searchFor || !matchIn) {
            return false;
        }
        return matchIn.map(value => value?.toUpperCase())?.includes(searchFor.toUpperCase())
    }

}

export class CountryFile extends CountrySource {
    protected async onFetchAll(): Promise<CountriesResponse> {
        try {
            return allCountries;          
        } catch (error) {
            return makeErrorResponse(HTTPStatus.internalServerError, "fetch error", "issue calling returning file");            
        }
    }
}

export class CountryAPI extends CountrySource {
    protected async onFetchAll(): Promise<CountriesResponse> {
        try {
            const res = await fetch(BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE);
            return await res.json();   
        } catch (e) {
            return makeErrorResponse(HTTPStatus.internalServerError, "fetch error", "issue calling external API");
        }
    }
}

const API_KEY_PARAM = "access_key"
const API_KEY_VALUE = "bff7d3afc17eeecb76b513afa67a199e"
const BASE_URL = "http://api.countrylayer.com/v2/all"