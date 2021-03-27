## Salary Conversion Endpoint

Salary conversion endpoint a simple REST API provider built using Express JS. It only provides one endpoint for GET request, which is `user/:id`. This endpoint is created for the following requirements:

- It can fetch data from http://jsonplaceholder.typicode.com/users
- It can join the fetched data with salary data from JSON file by using id
- It can add one field to represent salary in USD (salary in JSON file is in IDR) using currency converter (such as https://free.currencyconverterapi.com).
- Its output should be: id, name, username, email, address, phone, salary
  in IDR and salary in USD

## Copyright

&copy; Muhammad Arifin
