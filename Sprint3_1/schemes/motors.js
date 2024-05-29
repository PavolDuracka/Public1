//import mongoose for data handling
import mongoose from "mongoose";
//extracting schema from mongoose
const { Schema } = mongoose;
//new schema based on mongoose, specification
const motorsSchema = new Schema(
  {
    //definition of discipline code
    motorName: {
      type: String,
      required: true,
      unique: true,
    },
    //definition of teacher
    motorPower: {
      type: Number,
      required: true,
    },
    //definition of discipline name
    motorConnector: {
      type: String,
      required: true,
    },
    motorType: {
      type: String,
    },
    motorPrice: {
      type: Number,
    },
  },
  //property of timestamps include
  { timestamps: true }
);
//definition of parameter Nota
const Motor = mongoose.model("Motor", motorsSchema, "Motors");
//exporting Nota object
export default Motor;
