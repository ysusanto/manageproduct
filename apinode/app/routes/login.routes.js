module.exports = app => {
    const logins = require("../controllers/login.controller.js");

    app.post("/login", logins.login);
    
};