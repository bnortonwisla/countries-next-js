import CountrySearchForm from "./countrySearchForm";
import CountrySearchResult from "./countrySearchResult";
import { useState } from "react";

const CountrySearch = () => {

    const [ searchResult, setSearchResult] = useState();
    //TODO: handle long results
    return (
        <div>
            <CountrySearchForm
                setSearchResult={setSearchResult}
            />
            <CountrySearchResult 
                searchResult={searchResult} 
            />
        </div>
    );
}

export default CountrySearch;