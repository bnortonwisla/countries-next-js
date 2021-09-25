import { ICountry } from '../model/ICountry'

interface ICountryListProps {
    countries?: ICountry[];
}

const CountryList = ({ countries }: ICountryListProps) => {
    
    if (!countries || countries.length < 1) {
        return null;
    }

    return (
    <table>
        <tr>
            <th>Country</th>
        </tr>
        { countries.map((country, index) => (
        <tr>
            <td key={index}>{country.name}</td>  {/* using index is bad style https://reactjs.org/docs/lists-and-keys.html#keys*/}
        </tr>
        ))}
    </table>)
};

export default CountryList;