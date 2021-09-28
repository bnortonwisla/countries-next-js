import {CountryMockSingle, MOCK_RESULT_SINGLE} from '../__mocks__/countrySourceMock.js'

describe('CountrySource', () => {
    describe('Partial name', () => {
        it('returns country when it matches exactly', async () => {
        
            const test = RESULT_COUNTRY.name;

            const result = await testPartialName(test);

            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches exactly, but different case', async () => {
            const test = RESULT_COUNTRY.name.toUpperCase();

            const result = await testPartialName(test);

            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches beginning', async () => {
        
            const test = RESULT_COUNTRY.name.slice(0, 2);

            const result = await testPartialName(test);

            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches middle', async () => {
        
            const test = RESULT_COUNTRY.name.slice(2, 4).toLowerCase();

            const result = await testPartialName(test);

            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches end', async () => {
        
            const name = RESULT_COUNTRY.name
            const test = name.slice(4, name.length - 1).toLowerCase();

            const result = await testPartialName(test);

            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });
        it('returns empty array with non-match', async () => {
        
            const test = "ZZZZ";

            const result = await testPartialName(test);

            expect(result).toStrictEqual([]);
        });

        it('returns empty array with null', async () => {
        
            const test = "";

            const result = await testPartialName(test);

            expect(result).toStrictEqual([]);
        });
    });

    describe('Exact name', () => {
        it('returns country when it matches exactly', async () => {
        
            const test = RESULT_COUNTRY.name;

            const result = await testFullName(test);
                    
            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches exactly, but different case', async () => {
            const test = RESULT_COUNTRY.name.toUpperCase();

            const result = await testFullName(test);
                
            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns empty array with only partial match', async () => {
        
            const name = RESULT_COUNTRY.name;
            const test = name.slice(0, name.length - 2);

            const result = await testFullName(test);
                
            expect(result).toStrictEqual([]);
        });

        it('returns empty array with non-match', async () => {
        
            const test = "ZZZZ";

            const result = await testFullName(test);
                
            expect(result).toStrictEqual([]);
        });

        it('returns empty array with null', async () => {
        
            const test = "";

            const result = await testFullName(test);
                
            expect(result).toStrictEqual([]);
        });
    });
    
    describe('Code', () => {
        it('returns country when it matches a2 exactly', async () => {
        
            const test = RESULT_COUNTRY.alpha2Code;

            const result = await testCode(test);
                
            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches a3 exactly', async () => {
        
            const test = RESULT_COUNTRY.alpha2Code;

            const result = await testCode(test);
                
            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it matches a2 exactly, but different case', async () => {
            const test = RESULT_COUNTRY.alpha2Code.toLowerCase();

            const result = await testCode(test);
                
            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns country when it a3 exactly, but different case', async () => {
            const test = RESULT_COUNTRY.alpha3Code.toLowerCase();

            const result = await testCode(test);
                
            expect(result).toStrictEqual(MOCK_RESULT_SINGLE);
        });

        it('returns empty array with only partial match', async () => {
        
            const name = RESULT_COUNTRY.alpha2Code;
            const test = name.slice(0, 1);

            const result = await testCode(test);
            
            expect(result).toStrictEqual([]);
        });

        it('returns empty array with non-match', async () => {
        
            const test = "ZZ";

            const result = await testCode(test);
                
            expect(result).toStrictEqual([]);
        });

        it('returns empty array with null', async () => {
        
            const test = "";

            const result = await testCode(test);
                
            expect(result).toStrictEqual([]);
        });
    });
});

const RESULT_COUNTRY = MOCK_RESULT_SINGLE[0];

async function testPartialName(test) {
    return await new CountryMockSingle().fetchByPartialName(test);
}

async function testFullName(test) {
    return await new CountryMockSingle().fetchByFullName(test);
}

async function testCode(test) {
    return new CountryMockSingle().fetchByCode(test);
}