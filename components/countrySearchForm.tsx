import { FormEvent, useState } from "react";
import { getCountryListFromServer } from "../api-helper/client-api-wrapper";

interface ICountrySearchProps {
    setSearchResult: Function;
}

const CountrySearchForm = ({setSearchResult: setCountries}: ICountrySearchProps) => {
    const ghostText = "Search by country name or code";
    const searchLabel = "Search";
    const clearLabel = "Clear";

    const [inputState, setInputState] = useState("");
    const clearSearchResults = () => setCountries(undefined);
    
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();       
        
        if (isEmptyOrWhiteSpace(inputState)) {
            clearSearchResults();
        } else {
            getCountryListFromServer(inputState).then((value) => setCountries(value));
        }
    };

    const handleFormReset = (event: FormEvent<HTMLFormElement>) => {
        clearSearchResults();
        setInputState("");
    }

    return ( 
        <form 
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
            >
            <input 
                type="text" 
                placeholder={ghostText}
                size={ghostText.length}
                value = {inputState}
                onChange={e => setInputState(e.target.value)}
            />  {/*Note: type search is tricky to work with x/esc behavior*/}
            <button type="submit">{searchLabel}</button>
            <button type="reset">{clearLabel}</button>
        </form>);
}    

function isEmptyOrWhiteSpace(str: string) {
    return (!str || /^\s*$/.test(str));
}

export default CountrySearchForm;