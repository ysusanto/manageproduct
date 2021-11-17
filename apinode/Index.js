const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
require("./app/routes/user.routes.js")(app);
require("./app/routes/login.routes.js")(app);

// parse requests of content-type: application/x-www-form-urlencoded


app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});