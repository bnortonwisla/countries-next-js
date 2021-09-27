/**
 * React component showing summarized search results
 */

import { Country } from "../model/country";
import { CountriesResponse, isErrorResponse } from "../model/response";

interface SearchResultSummaryProps {
    searchResult?: CountriesResponse;
}

const SearchResultSummary = ({ searchResult }: SearchResultSummaryProps) => {
    if (!searchResult || isErrorResponse(searchResult) || searchResult.length < 1) {
        return null;
    }

    const regionSummary = summarizeCountries(searchResult, "region");

    return (
        <ul>
            <li>{"Total: " + searchResult.length}</li>
            {regionSummary.map((regionInfo, index) =>
                (<li key={index}>
                    {regionInfo.value + ": " + regionInfo.count}
                </li>)
            )}
        </ul>
    );
}

type PropertySummmary = {value: string, count: number};
function summarizeCountries(countries: Country[], property: keyof Country): PropertySummmary[] {
    
    //Summmarize
    const map = new Map<string, number>();
    countries.forEach(country => {
        const val = country[property]?.toString();
        if (val) {
            const count = map.get(val) ?? 0;
            map.set(val, count + 1);
        }
    });
    
    //Translate to array and sort
    const array: PropertySummmary[] = [];
    map.forEach((count, index) => {
        array.push({ value: index, count: count});
    });
    array.sort((a, b) => {
        const diff = b.count - a.count;                            //Reverse numerical on count
        return diff == 0 ? a.value.localeCompare(b.value) : diff;  //Fall back to alphabetical on value
    });

    return array;
}

export default SearchResultSummary;