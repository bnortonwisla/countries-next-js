Country Search was created to allow a user to search for countries and view information about them. It's key features are:
*Search box supporting partial name match, exact name match, exact country code match (2 or 3 character)
*Table showing country name and other information
*Footer showing total counts of countries countries per region

Notes: 
*This project deviate from the original requirements. Details below.
*No project is perfect. Known issues and improvements below.

This is a single-page application built with [Next.js] using [React] and [Node.js]. 

## Requirements
*Use the REST Countries API as your data source (https://restcountries.eu/)
**Exception: this API has been sold and undergone several changes
**End point is now located at https://countrylayer.com/ 
**Several fields are no longer available 
**This API is limited in queries per month, so this app retrieves from a saved json file (data/allCountries.json) by default. This can be changed by setting the USE_FILE_API constant to false in api-helper/server.ts 
*An HTML form input will accept the string of a country name or code.
*An error message will be emitted if users submit the form without input or if the search yields no results.  
*The form data must be submitted via JavaScript to a PHP server (or other backend server like Node) 
*[The server] then will retrieve data from the REST Countries API and return it to the frontend. 
*Do not attempt to cache results from the REST Countries API. 
*The backend endpoint you build should return JSON
*The return should include all the data necessary to render the view as described.
*Search is possible by country name, full name, or code. 
*On the server sort the countries returned by population in descending order.
**Exception: population is not included in the results so the countries are sorted as retrieved by API (alpha by country name)
*The search results should be displayed on an HTML page. 
*For each country displayed include: the full name, alpha code 2, alpha code 3, flag image, region, subregion, population, and a list of its languages.
**Exception: flag image, subregion, population, and languages are not returned by the API. I'm showing the flag image in alternate way, but the rest are  not included in the results.
*At the bottom of the page show the total number of countries, and list all regions and subregions contained in the results with the number of times it appeared.
**Exception: subregions are not returned by the API and not included in the summary

## Setup
Requires: [Node.js] and node package manager
Run the development server: npm run dev (from app directory)
Run release: npm run build > npm run start (from app directory)

## Using the App
Search page: https://localhost:3000/
API routes:
*Partial name search: api/name/partial/<part of country name>
*Exact name search: api/name/full/<full country name>
*Country code search: api/code/<2 or 3 character country name>

## Known Issues and Improvements
Functional
*accessibility: need handling for search form at least, not broadly considered or tested
*page history: missing, so back and forward buttons don't work as a user might expect
*auto focus on search box
*make search box UI nicer
*customize favorite icon: currently uses 
*center footer
*only serve relevant properties from internal API instead of passing through from external API

Code style
*unit tests lacking
*searchResults: split error messages and table into 2+ controls
*css: change file organization, use variables
*validation of external API results
*img tag: resolve linter warning by using Image for flag

# Original Next.js README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
