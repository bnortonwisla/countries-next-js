/**
 * React component for user input for country search 
 */

import { FormEvent, useRef, useState } from "react";
import { getCountryListFromServer, SearchType } from "../api-helper/client-wrapper";

interface SearchFormProps {
    setSearchResult: Function;
}

const SearchForm = ({setSearchResult: setCountries}: SearchFormProps) => {

    //Default states
    const searchTypeDefault = SearchType.partialName;
    const inputDefault = "";
    const clearSearchResults = () => setCountries(undefined);

    //React 
    const [searchTypeState, setSearchTypeState] = useState(searchTypeDefault)
    const [inputState, setInputState] = useState(inputDefault);
    const inputRef = useRef(null);

    //Event handlers
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
                title="Specify the type of search being performed"
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
                title="Enter text to search for using the selected type"
                size={30}
                value = {inputState}
                onChange={e => setInputState(e.target.value)}
                ref={inputRef}
            />  {/*Note: type search is tricky to work with x/esc behavior*/}
            <button 
                type="submit"
                title="Submit the search"
            >Search</button>
            <button 
                type="reset"
                title="Clear search results and reset to default search type"
            >Reset</button>
        </form>);
}    

function isEmptyOrWhiteSpace(str: string) {
    return (!str || /^\s*$/.test(str));
}

export default SearchForm;