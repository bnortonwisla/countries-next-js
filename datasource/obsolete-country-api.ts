import { countryProperties } from "../model/country";
import { CountriesResponse } from "../model/response";
import { DataSource } from "./country-filtered";

const API_KEY = "bff7d3afc17eeecb76b513afa67a199e"
const BASE_URL = "http://api.countrylayer.com/v2/"

enum RequestParameter {
    accessKey = "access_key",
    filters = "filters",
    fullString = "FullString"   
}

export class CountryLayerAPI implements DataSource {
    //What about "" search?
    public async fetchByPartialName(name: string): Promise<CountriesResponse> {
        return await this.fetchCore(new URLComposerName(name, false));
    }

    public async fetchByFullName(name: string): Promise<CountriesResponse> {
        return await this.fetchCore(new URLComposerName(name, true));
    }

    public async fetchByCode(code: string): Promise<CountriesResponse> {
        return await this.fetchCore(new URLComposerCode(code));
    }

    private async fetchCore(urlComposer: URLComposer): Promise<CountriesResponse> {
        const url = urlComposer.composeURL();
        const res = await fetch(url);
        const countries = await res.json();
        return countries;
    }
}

abstract class URLComposer {
    private readonly params: Map<RequestParameter, string>;
    private readonly path: string = "";

    protected constructor(path: string) {
        this.params = new Map<RequestParameter, string>();
        this.path = path;
    }

    protected addParam(param: RequestParameter, value: string): void {
        this.params.set(param, value);
    }

    public composeURL(): string {
        return BASE_URL + this.path + "?" + this.composeParamsList();
    }

    private composeParamsList(): string {

        this.params.set(RequestParameter.accessKey, API_KEY);
        this.params.set(RequestParameter.filters,countryProperties().join(";"));

        const composedParams: string[] = [];
        this.params.forEach((value, key) => {
            composedParams.push(key + "=" + value);  
        });

       return composedParams.join(",");

    }
}

class URLComposerName extends URLComposer {

    constructor(name: string, matchFullOnly: boolean) {
        super("name/" + name)
        if (matchFullOnly) {
            super.addParam(RequestParameter.fullString, "true")
        }
    }
}

class URLComposerCode extends URLComposer {

    constructor(code: string) {
        super("alpha/" + code)
    }
}