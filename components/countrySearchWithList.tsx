import CountrySearch from "./countrySearch";
import CountryList from "./countryList";
import { useState } from "react";
import { GetCountryList } from "../utils/GetCountryList";

const CountrySearchWithList = () => {

    const [ countries, setCountries] = useState(GetCountryList(""));
    
    return (
        <div>
            <CountrySearch
                setCountries={setCountries}
            />
            <CountryList 
                countries={countries} 
            />
        </div>
    );
}

export default CountrySearchWithList;