const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// parse requests of content-type: application/x-www-form-urlencoded

app.get('/helloworld', (req, res) => {
    res.json({
        message: "Welcome to bezkoder application."
    });
});
require("./app/routes/user.routes.js")(app);
app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});