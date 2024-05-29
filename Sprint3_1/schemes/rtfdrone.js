//import mongoose for data handling
import mongoose from "mongoose";
//extracting schema from mongoose
const { Schema } = mongoose;
//new schema based on mongoose, specification
const rtfSchema = new Schema(
  {
    //definition of discipline code
    droneName: {
      type: String,
      required: true,
      unique: true,
    },
    //definition of teacher
    droneBatterylife: {
      type: Number,
      required: true,
    },
    //definition of discipline name
    droneCamera: {
      type: String,
      required: true,
    },
    droneWeight: {
      type: Number,
    },
    dronePrice: {
      type: Number,
    },
  },
  //property of timestamps include
  { timestamps: true }
);
//definition of parameter Nota
const Rtfdrone = mongoose.model("Drone", rtfSchema, "Drones");
//exporting Nota object
export default Rtfdrone;
