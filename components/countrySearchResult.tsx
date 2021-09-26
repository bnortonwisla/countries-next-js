import { Country } from '../model/country';
import { HTTPStatus, CountriesResponse, ErrorResponse, isErrorResponse } from '../model/response';
import styles from '../styles/Home.module.css'

interface CountrySearchResultProps {
    searchResult?: CountriesResponse;
}

const CountrySearchResult = ({ searchResult }: CountrySearchResultProps) => {
    
    //TODO: Split out error into its own control
    let messageForNoResults: string = "";
    if (!searchResult) {
        return <div className={styles.searchInstructions}>
            <div>Use the search bar to find countries by:</div>
            <ul>
                <li>Partial match on the name</li>
                <li>Exact name</li>
                <li>2 or 3-character country code</li>
            </ul>
        </div>
    }
    else if (isErrorResponse(searchResult)) {
        messageForNoResults = composeErrorMessage(searchResult);
    } else if (searchResult.length< 1) {
        messageForNoResults = NO_COUNTRY_FOUND;
    }

    if (messageForNoResults) {
        return <div className={styles.noResultsMessage}>{messageForNoResults}</div>;
    }

    //TODO: more columns
    //TODO: validate/filter data

    return (
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Country</th>
                <th>Region</th>
                <th>Alpha-2</th>
                <th>Alpha-3</th>
                {/*<th>Subregion</th>
                <th>Population</th>
                <th>Languages</th>*/}
            </tr>
        </thead>
        { (searchResult as Country[]).map((country) => 
            (<tr>
                <td><img src={"https://www.countryflags.io/" + country.alpha2Code + "/flat/32.png"}/></td>
                <td>{country.name}</td>
                <td>{country.region}</td>
                <td>{country.alpha2Code}</td>
                <td>{country.alpha3Code}</td>
                {/*<td>{country.subregion}</td>
                <td>{country.population}</td>
                <td>{country.languages?.toString()}</td>*/} 
            </tr>)
        )}
    </table>)
};

function composeErrorMessage(response: ErrorResponse): string {
    switch (response.error.code) {
        case HTTPStatus.notFound: 
            return NO_COUNTRY_FOUND;
        default:
            return "Error retrieving countries: " + response.error.info;
    }
}

const NO_COUNTRY_FOUND = "No country found.";

export default CountrySearchResult;