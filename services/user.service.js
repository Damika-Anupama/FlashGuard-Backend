const db = require("./db.connection");
const helper = require("./helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM User WHERE user_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByName(username) {
  const result = await db.query(`SELECT * FROM User WHERE username=?`, [
    username,
  ]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByEmail(email) {
  const result = await db.query(`SELECT * FROM User WHERE email=?`, [email]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM User LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(user) {
  let message = "";
  const insertUser =
    "INSERT INTO User (username, email, password, first_name, last_name, date_of_birth, gender, profile_picture, user_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  await db.query(
    insertUser,
    [
      user.username,
      user.email,
      user.password,
      user.first_name,
      user.last_name,
      user.date_of_birth,
      user.gender,
      user.profile_picture,
      user.user_role,
    ],
    (error, results) => {
      if (error) {
        message = "Error in creating the user!";
      } else {
        message = "user created successfully!";
      }
    }
  );

  return { message };
}

async function update(id, user) {
  let message = "";
  const result = await db.query(
    "UPDATE User SET username = ?, email = ?, password = ?, first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, profile_picture = ?, user_role = ? WHERE user_id = ?",
    [
      user.username,
      user.email,
      user.password,
      user.first_name,
      user.last_name,
      user.date_of_birth,
      user.gender,
      user.profile_picture,
      user.user_role,
      id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      message = "Error in updating User";
    }
  );

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM User WHERE user_id=${id}`);

  let message = "Error in deleting user";

  if (result.affectedRows) {
    message = "User deleted successfully!";
  }

  return { message };
}

module.exports = {
  getById,
  getByName,
  getByEmail,
  getMultiple,
  create,
  update,
  remove,
};
