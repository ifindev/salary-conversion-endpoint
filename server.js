require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

var firstStart = true;

app.get("/user/:id", (req, res) => {
  /* Since we only have 10 users, let's filter the id */
  let id = req.params.id;

  if (id > 0 && id <= 10) {
    /* get stored users from the json */
    let storedUsers = getDataFromJSON("data/users_data.json");

    if (storedUsers.length === 0) {
      let users = [];

      let convURL = `https://free.currconv.com/api/v7/convert?q=IDR_USD&compact=ultra&apiKey=${process.env.API_KEY}`;
      let userURL = "https://jsonplaceholder.typicode.com/users/";

      let convRequest = axios.get(convURL);
      let userRequest = axios.get(userURL);

      axios.all([convRequest, userRequest]).then(
        axios.spread((...responses) => {
          const convRate = responses[0].data;
          const usersData = responses[1].data;

          /* Filter user data fields as per requirement */
          usersData.map((user) => {
            let newData = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              address: user.address,
              phone: user.phone,
            };
            users.push(newData);
          });

          /* convert IDR Salary into USD */
          let salaryData = getDataFromJSON("data/salary_data.json").array;
          let salaryWithUSD = [];
          salaryData.map((salary) => {
            let usd = salary.salaryInIDR * convRate.IDR_USD;
            salary = { ...salary, salaryInUSD: usd };
            salaryWithUSD.push(salary);
          });

          /* Join users data and salary data with USD */
          for (let i = 0; i < users.length; i++) {
            users[i] = { ...users[i], ...salaryWithUSD[i] };
          }

          /* Store users data into json file */
          storeDataToJSON("data/users_data.json", users);

          console.log("from api call");

          /* Send response */
          res.send(users[id - 1]);
        })
      );
    } else {
      console.log("from storage");
      res.send(storedUsers[id - 1]);
    }
  } else {
    res
      .status(404)
      .send({ error: true, message: "User with that id is not available" });
  }
});

/* store data to json file */
const storeDataToJSON = (file, data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(file, stringifyData);
};

/* get data from json file */
const getDataFromJSON = (file) => {
  const jsonData = fs.readFileSync(file);
  return JSON.parse(jsonData);
};

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
