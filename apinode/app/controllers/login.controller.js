const users = require("../models/user.model");
const bcrypt = require("bcrypt");


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
          console.log(email);
          const user= users.checkUserByEmail(email, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving user with id " + req.params.userId
                    });
                }
            } else {

                const userlogin= {
                    email:data.email,
                    name:data.name,
                   token:""
                };
                if (data && (await bcrypt.compare(password, data.password))) {
                    // Create token
                    const token = jwt.sign(
                      { user_id: data.id, email },
                      process.env.TOKEN_KEY,
                      {
                        expiresIn: "2h",
                      }
                    );
              
                    // save user token
                    userlogin.token = token;
              
                    // user
                    res.status(200).json(userlogin);
                  }
                  res.status(400).send("Invalid Credentials");
               
            }
            
           


          });

    } catch (error) {
         console.log(error);
    }
}