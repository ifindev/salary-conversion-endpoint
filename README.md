## Salary Conversion Endpoint

Salary conversion endpoint is a simple REST API provider built using Express JS. It only provides one endpoint for GET request, which is `user/:id`. This endpoint is created for the following requirements:

- It can fetch data from http://jsonplaceholder.typicode.com/users
- It can join the fetched data with salary data from JSON file by using id
- It can add one field to represent salary in USD (salary in JSON file is in IDR) using currency converter (such as https://free.currencyconverterapi.com).
- Its output should be: id, name, username, email, address, phone, salary
  in IDR and salary in USD

## Guide to Use

To use and test this program on your local machine, do these steps:

- Get API Key for salary conversion from https://free.currencyconverterapi.com/
- Clone this repository.
- Go to the main folder, then run `npm install` for installing all the dependencies.
- Create a new `.env` file on root directory. Write `API_KEY = your-api-key". Save it.
- To run locally, use `node main.js`. The express server will start on port `3000`.
- Open up Postman, set request to GET. Then open `localhost:3000/user/:id` where `:id` is an id number range from 1 to 10.

## Copyright

&copy; Muhammad Arifin
