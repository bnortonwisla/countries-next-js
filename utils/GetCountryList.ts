import { ICountry } from "../model/ICountry";

export function GetCountryList(searchText: string): ICountry[] {
    const c = [{ name: "Uganda"}, {name: "Peru"}];
    return searchText == "" ? [] : c;
}