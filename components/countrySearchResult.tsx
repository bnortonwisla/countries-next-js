import { HTTPStatus, CountriesResponse, IErrorResponse, isIErrorResponse } from '../model/response';

interface ICountrySearchResultProps {
    searchResult?: CountriesResponse;
}

const CountrySearchResult = ({ searchResult }: ICountrySearchResultProps) => {
    
    if (!searchResult) {
        return null;
    }
    else if (isIErrorResponse(searchResult)) {
        return <div>{composeErrorMessage(searchResult)}</div>;
    } else if (searchResult.length < 1) {
        return <div>{NO_COUNTRY_FOUND}</div>;
    }

    return (
    <table>
        <tr>
            <th>Country</th>
        </tr>
        { searchResult.map((country, index) => (
        <tr>
            <td key={index}>{country.name}</td>  {/* using index is bad style https://reactjs.org/docs/lists-and-keys.html#keys*/}
        </tr>
        ))}
    </table>)
};

function composeErrorMessage(response: IErrorResponse): string {
    switch (response.error.code) {
        case HTTPStatus.notFound: 
            return "No country found.";
        default:
            return "Error retrieving countries."
    }
}

const NO_COUNTRY_FOUND = "No country found.";

export default CountrySearchResult;