import { useState } from "react";
import { ICountry } from "../model/ICountry";
import { GetCountryList } from "../utils/GetCountryList";

interface ICountrySearchProps {
    setCountries: Function;
}

const CountrySearch = ({setCountries}: ICountrySearchProps) => {
    const ghostText = "Search by country name or code";

    const [inputState, setInputState] = useState("");

    return ( 
    <div>
        <input
            type="search"
            placeholder={ghostText}
            size={ghostText.length}
            onChange={e => {
                setInputState(e.target.value);
            }}
        />
        <button 
            type="submit"
            onClick={(e) => {
                e.preventDefault();
                setCountries(GetCountryList(inputState));
            }}
        >
            Search
        </button>
    </div>);
}    

export default CountrySearch;