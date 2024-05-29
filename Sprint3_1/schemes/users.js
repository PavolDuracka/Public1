//import mongoose for data handling
import mongoose from "mongoose";
//extracting schema from mongoose
const { Schema } = mongoose;
// Define a custom email validation function
function validateEmail(email) {
  // Use a regular expression to validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

//new schema based on mongoose, specification
const userSchema = new Schema(
  {
    //definition of discipline code
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    //definition of teacher
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Invalid email format"],
    },
    //definition of discipline name
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  //property of timestamps include
  { timestamps: true }
);
//definition of parameter Nota
const User = mongoose.model("User", userSchema, "Users");
//exporting Nota object
export default User;
