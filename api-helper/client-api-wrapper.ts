import { CountriesResponse } from "../model/response";

export async function getCountryListFromServer(searchText: string): Promise<CountriesResponse[]> {
    if (searchText == null)
    {
        return [];
    }
    const url = "http://localhost:3000/api/search" + "?searchText=" + searchText;
    const res = await fetch(url);
    return await res.json();
};