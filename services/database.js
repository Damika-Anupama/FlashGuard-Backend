const mysql = require("mysql2");
const config = require("../config/config");

const detail = {
  host: config.host,
  user: config.user,
  password: config.password,
};

const connection = mysql.createConnection(detail);

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to MySQL");

  connection.query(
    `CREATE DATABASE IF NOT EXISTS flashguard`,
    function (error, results) {
      if (error) throw error;
      console.log("Database created");
    }
  );

  connection.query(`USE flashguard`, function (error, results) {
    if (error) throw error;
    console.log("Using flashguard");
  });

  // create the 'User' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS User (
        user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender VARCHAR(255) NOT NULL,
        profile_picture VARCHAR(255) NOT NULL,
        user_role VARCHAR(255) NOT NULL
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("User table created");
    }
  );

  // create the 'Setting' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Setting (
        user_id INT NOT NULL,
        darken_threshold INT NOT NULL,
        notification_threshold INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Setting table created");
    }
  );

  // create the 'Seizure' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Seizure (
        seizure_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        seizure_type VARCHAR(255) NOT NULL,
        seizure_location VARCHAR(255) NOT NULL,
        seizure_triggers VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Seizure table created");
    }
  );

  // create the 'Location' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Location (
        location_id INTEGER NOT NULL AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        latitude DECIMAL(9,6) NOT NULL,
        longitude DECIMAL(9,6) NOT NULL,
        location_name VARCHAR(255) NOT NULL,
        location_type VARCHAR(255) NOT NULL,
        PRIMARY KEY (location_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Location table created");
    }
  );

  // create the 'Medication' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Medication (
        medication_id INTEGER NOT NULL AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        medication_name VARCHAR(255) NOT NULL,
        dosage VARCHAR(255) NOT NULL,
        frequency VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        side_effects VARCHAR(255) NOT NULL,
        PRIMARY KEY (medication_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Medication table created");
    }
  );

  // create the 'Trigger_Detail' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Trigger_Detail (
        trigger_id INTEGER NOT NULL AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        trigger_type VARCHAR(255) NOT NULL,
        trigger_frequency INTEGER NOT NULL,
        trigger_intensity INTEGER NOT NULL,
        trigger_location VARCHAR(255) NOT NULL,
        PRIMARY KEY (trigger_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Trigger_Detail table created");
    }
  );

  // create the 'Log' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Log (
        log_id INTEGER NOT NULL AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        stimulus_type VARCHAR(255) NOT NULL,
        stimulus_frequency INTEGER NOT NULL,
        stimulus_duration INTEGER NOT NULL,
        log_time DATETIME NOT NULL,
        stimulus_intensity INTEGER NOT NULL,
        stimulus_location VARCHAR(255) NOT NULL,
        PRIMARY KEY (log_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Log table created");
    }
  );

  // create the 'Notification' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Notification (
        notification_id INTEGER NOT NULL AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        notification_time DATETIME NOT NULL,
        notification_type VARCHAR(255) NOT NULL,
        notification_message VARCHAR(255) NOT NULL,
        PRIMARY KEY (notification_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Notification table created");
    }
  );

  // create the 'Doctor' table
  connection.query(
    `
        CREATE TABLE IF NOT EXISTS Doctor (
        doctor_id INTEGER NOT NULL AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        doctor_name VARCHAR(255) NOT NULL,
        clinic_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        appointment_date DATE NOT NULL,
        PRIMARY KEY (doctor_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
    `,
    function (error, results) {
      if (error) throw error;
      console.log("Doctor table created");
    }
  );
  // Close the connection
  connection.end();
});

module.exports = connection;
