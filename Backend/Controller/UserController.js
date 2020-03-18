var db = require("../models/index");
const bcrypt = require("bcryptjs");

module.exports.getOne = (req, res) => {
  db.Users.findByPk(req.params.id)
    .then(result => {
      if (result) {
        console.log(
          "[" + "GET".green + "] User fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] User not found in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] User fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};

module.exports.getSaves = async (req, res, next) => {
  try {
    const currentUser = await db.Users.findByPk(req.params.id);
    if (currentUser) {
      const saves = await currentUser.getSaves({ raw: true });
      if (saves.length) {
        console.log(
          "[" +
            "GET".green +
            "] User's saves fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: saves
        });
      } else {
        console.log("[" + "GET".green + "] User has no saves.");
        res.status(404).send({
          status: "not found"
        });
      }
    } else {
      console.log("[" + "GET".green + "] User does not exist.");
      res.status(400).send({
        status: "bad request: user not found"
      });
    }
  } catch (error) {
    console.log(
      "[" + "GET".green + "] User saves fetch created server error."
    );
    next(error);
  }
};

module.exports.add = (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).send({
      status: "bad request: please enter all fields"
    });
  }
  db.Users.findOne({ where: { email } }).then(user => {
    if (user) {
      return res.status(400).send({
        status: "bad request: e-mail already in use"
      });
    } else {
      const newUser = {
        fullName,
        email,
        password
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          db.Users.create(newUser)
            .then(result => {
              console.log("[" + "POST".yellow + "] User added successfully.");
              res.status(201).json(result);
            })
            .catch(err => {
              console.log(
                "[" + "POST".yellow + "] Adding user created server error."
              );
              res.json(err);
            });
        });
      });
    }
  });
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).send({
            status: "bad request: please eneter all fields"
        });
    }
    db.Users.findOne({ where: { email, password }}).then(user =>{
        if(user) {
            return res.status(200).send({
                success: !!user.id,
                userId: user.id
            })
        } else {
            return res.status(404).send({
                status: "not found"
            })
        }
    });
};

module.exports.update = (req, res) => {
  db.Users.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      console.log("[" + "PUT".blue + "] User updated successfully.");
      res.status(200).send({
        status: "success"
      });
    })
    .catch(err => {
      console.log("[" + "PUT".blue + "] Updating user created server error.");
      res.json(err);
    });
};

module.exports.delete = (req, res) => {
  db.Users.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      console.log("[" + "DEL".red + "] User deleted successfully.");
      res.status(204).send();
    })
    .catch(err => {
      console.log("[" + "DEL".red + "] Deleting user created server error.");
      res.json(err);
    });
};

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.status(200).send({});
};

module.exports.checkUserLoginStatus = (req, res) => {
    try {
        if (req.session.userId) {
            const currentUser = db.Users.findByPk(req.session.userId);
            res.status(200).send(currentUser);
        }
    } catch (err) {}
};