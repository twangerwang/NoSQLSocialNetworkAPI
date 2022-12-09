const { User, Thought } = require("../models");
const { populate } = require("../models/User");

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get single user by ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID found!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID found!" })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: "User and thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  //createNewFriend
  createNewFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //deleteUserFriend
  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
