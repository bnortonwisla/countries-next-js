import { ICountry } from "../model/country";
import { IDataSource } from "./country-api";
//import sample from "../data/countriesSample.json"
import allCountries from "../data/countriesAll.json"
import { CountriesResponse } from "../model/response";

export class CountryFile implements IDataSource {

    public async fetchByPartialName(name: string): Promise<CountriesResponse> {
        const countries = this.fetchSample();
        const filtered = countries.filter((country) => CountryFile.includes(name, country.name));
        return filtered;
    }

    public async fetchByFullName(name: string): Promise<CountriesResponse> {
        const countries = this.fetchSample();
        const filtered = countries.filter((country) => CountryFile.matches(name, country.name));
        return filtered;
    }


    public async fetchByCode(code: string): Promise<CountriesResponse> {
        const countries = this.fetchSample();
        return countries.filter((country) => CountryFile.matches(code, country.alpha2Code, country.alpha3Code));
    }

    private fetchSample(): ICountry[] {
        //const res = await fetch("https://localhost:3000/data/countriesSample.json");  //Why issue retrieving this way? Unable to find file
        //const c = await res.json();
        //return c;
        
        return allCountries;
        //return sample;
    }

    private static includes(searchFor: string, findIn: string): boolean {
        return findIn.toUpperCase().includes(searchFor.toUpperCase())
    }

    private static matches(searchFor: string, ... matchIn: (string|undefined)[]): boolean {
        return matchIn.map(value => value?.toUpperCase()).includes(searchFor.toUpperCase())
    }

}