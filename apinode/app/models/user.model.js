const sql = require("./db.js");

// constructor
const User = function(user) {
    this.email = user.email;
    this.name = user.name;
    this.username = user.username;
    this.telp = user.telp;
    this.password = user.password;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.deleted_at = user.deleted_at;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created User: ", {
            id: res.insertId,
            ...newUser
        });
        result(null, {
            id: res.insertId,
            ...newUser
        });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM user where deleted_at=null", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET email = ?, name = ?, username = ?, telp = ?, password = ?, updated_at = now() WHERE id = ?", [user.email, user.name, user.username, user.telp, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({
                    kind: "not_found"
                }, null);
                return;
            }

            console.log("updated user: ", {
                id: id,
                ...user
            });
            result(null, {
                id: id,
                ...user
            });
        }
    );
};

User.remove = (id, result) => {
    sql.query("update user set deleted_at=now() WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("update user set deleted_at=now()", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};
User.checkUsername = (username, result) => {
    sql.query("SELECT * FROM user WHERE username = '" + username + "'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found username: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    });
};
module.exports = User;