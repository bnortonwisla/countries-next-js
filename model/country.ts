export interface Country {
  name: string;
  topLevelDomain?: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes?: string[];
  capital: string;
  altSpellings?: string[];
  region: string;
}

/* 
Desired output of our API would be the following, but not all of these are available.

Project requirements: the full name, alpha code 2, alpha code 3, flag image, 
region, subregion, population, and a list of its languages.  

export interface Country
{
    name: string;
    alpha2Code?: string;
    alpha3Code?: string;
    region?: string;
    subregion?: string;
    population?: number;
    languages?: ILanguage[];
    flag?: string;
  }

interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}  
*/

type PropertyOfCountry = keyof Country;

export function countryProperties(): PropertyOfCountry[] {
  
  //Trick to ensure all (and only) properties are included in output since you can't loop over an interface's property list.
  //Boolean as value could theoretically be used to control the list, but might make more sense to use different interface.
  const properties: Record<PropertyOfCountry, boolean> = {
    "name": true,
    "alpha2Code": true,
    "alpha3Code": true,
    "region": true,
    "altSpellings": true,
    "topLevelDomain": true,
    "callingCodes": true,
    "capital": true
  }

  const propNameList: PropertyOfCountry[] = [];
  for (const key in properties) {
    const propName = key as PropertyOfCountry;  
    if (properties[propName]) {
          propNameList.push(propName);
      }
  }
  return propNameList;
}