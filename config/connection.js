const { connect, connection } = require("mongoose");
const connectionString =
  process.env.MonGODB_URI || "mongodb://127.0.0.1:27017/usersDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
