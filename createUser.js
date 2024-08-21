// createUser.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createUser = async (email, password, role) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists");
      return;
    }

    // Create a new user
    user = new User({
      email,
      password,
      role,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();
    console.log(`${role} user created: ${email}`);
    mongoose.disconnect();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Create an admin user
createUser("admin@zhahi.in", "admin123", "admin");

// Create a staff user
createUser("staff@zhahi.in", "staff123", "staff");
