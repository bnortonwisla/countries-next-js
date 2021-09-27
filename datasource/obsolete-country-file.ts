import allCountries from "../data/allCountries.json"
import { CountriesResponse } from "../model/response";
import { Country } from "../model/country";
import { DataSource } from "./country-filtered";

export class CountryFile implements DataSource {

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

    private fetchSample(): Country[] {
        return allCountries;
    }

    private static includes(searchFor: string, findIn: string): boolean {
        return findIn.toUpperCase().includes(searchFor.toUpperCase())
    }

    private static matches(searchFor: string, ... matchIn: (string|undefined)[]): boolean {
        return matchIn.map(value => value?.toUpperCase()).includes(searchFor.toUpperCase())
    }

}