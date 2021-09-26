//Requirements: the full name, alpha code 2, alpha code 3, flag image, region, subregion, population, and a list of its languages.
export interface ICountry {
    name: string;
    alpha2Code?: string;
    alpha3Code?: string;
    region?: string;
    subregion?: string;
    population?: number;
    languages?: (ILanguage)[] | null;
    flag?: string;
  }

interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}  

type PropertyOfICountry = keyof ICountry;

export function countryProperties(): PropertyOfICountry[] {
  const properties: Record<PropertyOfICountry, boolean> = {
      "name": true,
      "alpha2Code": true,
      "alpha3Code": true,
      "region": true,
      "subregion": true,
      "languages": true,
      "flag": true,
      "population": true,
  }

  const propNameList: PropertyOfICountry[] = [];
  for (const key in properties) {
    const propName = key as PropertyOfICountry;  
    if (properties[propName]) {
          propNameList.push(propName);
      }
  }
  return propNameList;
}