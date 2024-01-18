const User = require("../model/model");

// Create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content body cannot be empty!!",
    });
    return;
  }

  // new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error Occurred!",
      });
    });
};

// Retrieve all users/single user from the database.
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    User.findById(id)
      .then((data) => {
        if(!data){
          res.status(404).send({message: "user not found with id" + id});
        }
        else{
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving user data !",
        });
      });
  } else {
    User.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some Error Occurred!",
        });
      });
  }
};

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty!!",
    });
    return;
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error Updating user information!`,
      });
    });
};

// Delete a user by user id
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete user with ${id}. Maybe Id is invalid!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting user!`,
      });
    });
};
