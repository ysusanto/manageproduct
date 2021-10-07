const users = require("../models/user.model");
const bcrypt = require("bcrypt");



exports.create = async(req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const today = new Date();
    const salt = await bcrypt.genSalt(10);
    const user = new users({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        telp: req.body.telp,
        password: await bcrypt.hash(req.body.password, salt),
        created_at: today

    });

    users.checkUsername(req.body.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                users.create(user, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the user."
                        });
                    else res.send(data);
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }
        } else res.send({
            message: `Username ` + req.body.username + ' Exist please input other username'
        });
    });


};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    users.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    users.findById(req.params.userId, (err, data) => {
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
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    users.updateById(
        req.params.userId,
        new users(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    users.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            }
        } else res.send({
            message: `user was deleted successfully!`
        });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    users.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all user."
            });
        else res.send({
            message: `All user were deleted successfully!`
        });
    });
};
exports.checkUsername = (req, res) => {
    users.checkUsername(req.body.username, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while check all user."
            });
        else res.send({
            message: `Username ` + req.body.username + ' Exist please input other username'
        });
    });
};