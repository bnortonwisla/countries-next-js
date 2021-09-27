/**
 * React component for user input for country search 
 */

import { FormEvent, useRef, useState } from "react";
import { getCountryListFromServer, SearchType } from "../api-helper/client";

interface SearchFormProps {
    setSearchResult: Function;
}

const SearchForm = ({setSearchResult: setCountries}: SearchFormProps) => {
    const searchLabel = "Search";
    const reseatLabel = "Reset";

    const searchTypeDefault = SearchType.partialName;
    const inputDefault = "";
    const clearSearchResults = () => setCountries(undefined);

    const [searchTypeState, setSearchTypeState] = useState(searchTypeDefault)
    const [inputState, setInputState] = useState(inputDefault);
    const inputRef = useRef(null);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();       
        
        if (isEmptyOrWhiteSpace(inputState)) {
            clearSearchResults();
        } else {
            getCountryListFromServer(inputState, searchTypeState).then((value) => setCountries(value));
        }
    };

    const handleFormReset = (event: FormEvent<HTMLFormElement>) => {
        clearSearchResults();
        setInputState(inputDefault);
        setSearchTypeState(searchTypeDefault);
        (inputRef?.current as HTMLElement | null)?.focus();  //Get around current recognized as never type
    }

    return ( 
        <form 
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}>
            <select
                multiple={false}
                value={searchTypeState}
                onChange={e => setSearchTypeState(e.target.value as SearchType)}
            >
                <option value={SearchType.partialName}>Name</option>
                <option value={SearchType.fullName}>Exact Name</option>
                <option value={SearchType.code}>Code</option>
            </select>
            <input 
                type="text" 
                size={30}
                value = {inputState}
                onChange={e => setInputState(e.target.value)}
                ref={inputRef}
            />  {/*Note: type search is tricky to work with x/esc behavior*/}
            <button type="submit">{searchLabel}</button>
            <button type="reset">{reseatLabel}</button>
        </form>);
}    

function isEmptyOrWhiteSpace(str: string) {
    return (!str || /^\s*$/.test(str));
}

export default SearchForm;