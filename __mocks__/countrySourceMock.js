import {CountrySource} from '../datasource/country-filtered.ts'

export const MOCK_RESULT_SINGLE = [{
    name: "MockName",
    alpha2Code: "MC",
    alpha3Code: "MCK",
    region: "MockRegion"
}];

export class CountryMockSingle extends CountrySource {
    async onFetchAll() {
        return MOCK_RESULT_SINGLE
    }
}