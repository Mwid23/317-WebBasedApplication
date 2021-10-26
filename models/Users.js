var db = require("../conf/database");
const UserModel = {};
var bcrypt = require('bcrypt');

UserModel.create =(username, password, email) => {
    return bcrypt.hash(password,15)
    .then((hashedPassword) => {
        let baseSQL =
        "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());";
      return db.execute(baseSQL, [username, email, hashedPassword])
    })
    .then(([results, fields]) =>{
        if(results && results.affectedRows){
            return Promise.resolve(results.insertId);
        }else{
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

UserModel.usernameExists = (username) => {
    return db.execute("SELECT * FROM users WHERE username=?",
    [username])
    .then(([results,fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

UserModel.emailExists = (email) => {
    return db.execute("SELECT * FROM users WHERE email=?",
    [email])
    .then(([results,fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

UserModel.authenticate = (username, password) => {
}
module.exports = UserModel;