import express, { query } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "qwerty1";
const yourPassword = "password123";
const yourAPIKey = "dd84fe5d-0c2c-4152-9cb7-7d96f6f17903";
const yourBearerToken = "cc4420a6-841b-4907-9eb7-ac4faf036e06";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const result = await axios.get(`https://secrets-api.appbrewery.com/random`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const result = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }catch(error){
    res.status(404).send(error.message);
  }


  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try{
    const result = await axios.get('https://secrets-api.appbrewery.com/filter', {
      params: {
        score:5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
 try{
  const result = await axios.get('https://secrets-api.appbrewery.com/secrets/42',{
    headers:{
      Authorization: `Bearer ${yourBearerToken}`
    }
  });
  res.render("index.ejs", { content: JSON.stringify(result.data) });
 }catch(error){
  res.status(404).send(error.message);
}
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
