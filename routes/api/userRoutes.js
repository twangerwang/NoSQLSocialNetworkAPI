const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createNewFriend,
  deleteUserFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:id/friends/:friendId")
  .post(createNewFriend)
  .delete(deleteUserFriend);

module.exports = router;
