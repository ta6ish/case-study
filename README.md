# Case Study
An Express.js application for serving the case-study records. [Live at heroku!](https://ta6ish-case-study.herokuapp.com/)

## Request
* `startDate` Date for filtering the results from. format `YYYY-MM-DD`
* `startDate` Date for filtering the results to. format `YYYY-MM-DD`
* `minCount` Min value for the counts sum.
* `maxCount` Max value for the counts sum.
```bash
curl --location --request POST 'https://ta6ish-case-study.herokuapp.com/api/case-study' \--header 'Content-Type: application/json' \--data-raw '{
    "startDate": "2015-05-10",
    "endDate": "2015-05-18",
    "minCount": 20,
    "maxCount": 80
}'
```
## Response
* `code` 0 means success
* `msg` Message explaining the operation execution
* `records` Filtered results
```javascript
{"code":0,"msg":"success","records":[{"key":"PFHJeccA","createdAt":"2015-05-17T15:32:16.799Z","totalCount":36}]}
```

## Pre-reqs
To run this app locally you will need:
- [Node.js](https://nodejs.org/en/)


## Development setup
* Install dependencies `npm install -D`
* Rename `.env.example` to `.env` and provide values.
* Start in development mode `npm run dev`

## Execute
```bash
curl --location --request POST 'http://localhost:3000/api/case-study' \--header 'Content-Type: application/json' \--data-raw '{
    "startDate": "2015-05-10",
    "endDate": "2015-05-18",
    "minCount": 20,
    "maxCount": 80
}'
```

## Test
`npm test`

## Containerize 🐋
```bash
docker build -t nodeapp .
docker container run -p 3000:3000 -d nodeapp
```
